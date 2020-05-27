$(document).ready(function() {
  $('.tabla-ajax').each(function() {
    var $this = $(this);
    var seleccion = $this.data('seleccion');
    var columna_id = ($this.data('columna-id')) ? $this.data('columna-id') : 'id';
    var columna_img = ($this.data('column-Img')) ? $this.data('column-Img') : 'Img';
    $this.bootgrid({
      ajax: true,
      responsiveTable: true,
      url: $this.data('url'),
      post: function() {
        return {
          filtros: $('.filtros').serialize(),
        };
      },
      formatters: {
        "acciones": function(c, r) {
          return $this.data('url-delete')?'<div class="actions"><a href="' + $this.data('url-show') + '/' + r[columna_id] + '" class="btn btn-primary" ><i class="fas fa-search" aria-hidden="true"></i></a><a href="#" class="btn btn-danger btn-eliminar-registro" data-id="' + r[columna_id] + '"><i class="fas fa-trash" aria-hidden="true"></i></a></p>':'<div class="actions"><a href="' + $this.data('url-show') + '/' + r[columna_id] + '" class="btn btn-primary" ><i class="fas fa-search" aria-hidden="true"></i></a></p>';
        },
        "Img": function(c, r) {
          return '<div class="image-table"><img src="'+r[columna_img]+ '" alt=""></div>';
        }
      },
      selection: seleccion,
      multiSelect: seleccion
    }).on("loaded.rs.jquery.bootgrid", function() {
      /* Executes after data is loaded and rendered */
      $this.find(".btn-eliminar-registro").on("click", function(e) {
        var id = $(this).data('id');
        swal({
            title: "Borrar registro",
            text: "¿Está seguro que desea borrar el registro?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(function(borrar) {
            if (borrar) {
              var data = {};
              data[columna_id] = id;
              $.post($this.data('url-delete'), data).then(function(res) {
                if (res.error) {
                  swal("¡Error!", res.mensaje, "error");
                } else {
                  swal("¡Éxito!", "El registro se borró correctamente", "success");
                  $this.bootgrid('reload');
                }
              }).fail(function() {
                swal('¡Error!', 'Ocurrió un error al conectarse con el servidor', 'error');
              });
            }
          });
      });

      $this.find('.show-details-proyect').on('click', function(e) {
      });

    });
    //Filtros
    $('.filtros :input').change(function() {
      $this.bootgrid('reload');
    });
  });
});
