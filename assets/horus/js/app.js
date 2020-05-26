function existe(id) {
  return document.getElementById(id) != null;
}
var Tags = existe('Tags') ? new Vue({
  el: '#Tags',
  data: {
    id: 0,
		url:'',
    datos: {}
  },
  mounted: function() {
    this.id = this.$el.dataset.id;
		this.url = this.$el.dataset.url;
    this.Render();
  },
  methods: {
    Render: function() {
      $.post(ajaxurl + '/' + this.url +'/', {
        'id': this.id
      }).then(function(res) {
				this.datos = res.data;
      }.bind(this)).fail(function() {
        // swal('Error', 'Error al conectar al servidor', 'error');
      });
			
    }
  }
}) : false;
