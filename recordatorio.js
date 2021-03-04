var app = new Vue({
    el: '#miApp',
    data: {
      filtro:'',
      tituloNuevoRecordatorio: '',
      nuevoRecordatorio: '',
      listaRecordatorios:[],
      isDisabled:true
    },
    mounted()
    {
        if(localStorage.listaTareas)
        this.listaRecordatorios=JSON.parse(localStorage.listaTareas);
    },
    methods: {
        añadirRecordatorio: function()
        {
            
            if(this.isDisabled==false){
                var nota={
                    "titulo":this.tituloNuevoRecordatorio,
                    "content":this.nuevoRecordatorio,
                    "date":new Date(),
                    "done":false,
                    "prioridad":"low"
                };
                this.listaRecordatorios.push(
                    nota
                );
                this.nuevoRecordatorio="";
                this.isDisabled=true;
                this.actualizarLocalStorage();
            }
        },
        borrarCompletadas: function()
        {
            this.listaRecordatorios=this.listaRecordatorios.filter((nota)=>{
                return!nota.done;
            });
            this.actualizarLocalStorage();
        },
        /*borrarRecordatorio: function(pos)
        {
            this.listaRecordatorios.splice(pos,1);
        },*/
        cambiarEstado: function(index)
        {        
            index=this.listaRecordatorios.indexOf(this.listaFiltrada[index]);
            this.listaRecordatorios[index].done=!this.listaRecordatorios[index].done;
            this.actualizarLocalStorage();
        },
        teclaPulsada: function()
        {
            if(this.nuevoRecordatorio.length>0){
                this.isDisabled=false;
            }else{
                this.isDisabled=true;
            }
        },
        actualizarLocalStorage: function()
        {
            localStorage.listaTareas= JSON.stringify(this.listaRecordatorios);
        },
        cambiarPrioridad: function(index)
        {
            index=this.listaRecordatorios.indexOf(this.listaFiltrada[index]);
            switch(this.listaRecordatorios[index].prioridad){
                case "low":this.listaRecordatorios[index].prioridad="medium";break;
                case "medium":this.listaRecordatorios[index].prioridad="high";break;
                case "high":this.listaRecordatorios[index].prioridad="low";
            }
            this.actualizarLocalStorage();
        }
    },
    computed: {
        totalTareas: function()
        {
            return this.listaRecordatorios.length;
        },
        totalCompletadas: function()
        {
            let total=0;
            for(var i=0; i<this.listaRecordatorios.length;i++){
                if(this.listaRecordatorios[i].done==true)
                    total++;
            }
            return total;
        },
        listaFiltrada: function()
        {
              return this.listaRecordatorios.filter((recordatorio)=>{
                  return(recordatorio.titulo.includes(this.filtro));
              })
        }
    }
  })
  document.getElementsByTagName("input")[0].focus();
