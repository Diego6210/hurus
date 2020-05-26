$(document).ready(function() {
  if (existe('map')) {
    $.post(ajaxurl + '/target/listlocation', {
      id: $('#map').data('id')
    }).then(function(res) {
      genMap(res.data);
    }).fail(function() {});


  }

  if (existe('SelectDir')) {
    renderSelectDir();
  }


  if (existe('archivos')) {
    renderFiles();
  }

  if ($.fn.dropify) {
    $('.dropify').dropify({
      messages: {
        'default': 'Arrastra un archivo o da click aquí',
        'replace': 'Arrastra un archivo o da click aquí­ para reemplazar',
        'remove': 'Quitar',
        'error': 'Ooops, ocurrió un error, intente más tarde, por favor.'
      }
    });
  }



  $(document).on('click', '.addtoproyect', function(e) {
    var $this = $(this);
    var id_proyect = $('#AddTarget').data('id');
    var id_user = $this.data('id');
    data = {
      'idp': id_proyect,
      'idu': id_user
    };
    $.post(ajaxurl + '/proyects/addtarget', data).then(function(res) {
      if (res.error) {
        swal('Error', res.message, 'error');
      } else {
        $('#AddTarget').toggle();
        $('.modal-backdrop').remove();
        $('.tabla-ajax').bootgrid('reload');
      }
    }).fail(function() {
      swal('Error', 'Error al conectarse con el servidor', 'error');
    });
  });

  $(document).on('click', '.link-target', function(e) {
    var $this = $(this);
    $("#tcontacts").append('<tr><td class="text-left" style=""><input type="hidden" name="data[contacts][]" value="' + $this.data('id') + '"><div class="image-table"><img src="' + $this.data('url') + '" alt=""></div></td><td>' + $this.data('name') + '</td><td class="text-center" style=""><div class="actions"><a href="' + planurl + '/dashboard/target/' + $this.data('id') + '" target="_blank" class="btn btn-primary"><i class="fas fa-search" aria-hidden="true"></i></a></div></td></tr>');
  });

  $(document).on('click', '.add-acount', function(e) {
    var $this = $(this);
    $("#tacount").append('<tr><td class="font-icon-list"><i class="fab fa-facebook"></i></td><td><input type="hidden" name="data[url][]" value="' + $("#Url-a").val() + '">' + $("#Url-a").val() + '</td><td><input type="hidden" name="data[email][]" value="' + $("#Email-a").val() + '">' + $("#Email-a").val() + '</td><td class="text-center"><input type="hidden" name="data[pass][]" value="' + $("#Pass-a").val() + '">' + $("#Pass-a").val() + '</td></tr>');
  });


  $(document).on('click', '.add-acount-2', function(e) {
    $.post(ajaxurl + '/target/addacount', {
      idu: $("#idUG").val(),
      url: $("#Url-a").val(),
      email: $("#Email-a").val(),
      pass: $("#Pass-a").val()
    }).then(function(res) {
      if (res.error) {
        swal('Error', res.message, 'error');
      } else {
        $("#tacount").append('<tr><td class="font-icon-list"><i class="fab fa-facebook"></i></td><td><input type="hidden" name="data[url][]" value="' + $("#Url-a").val() + '">' + $("#Url-a").val() + '</td><td><input type="hidden" name="data[email][]" value="' + $("#Email-a").val() + '">' + $("#Email-a").val() + '</td><td class="text-center"><input type="hidden" name="data[pass][]" value="' + $("#Pass-a").val() + '">' + $("#Pass-a").val() + '</td></tr>');
      }
    }).fail(function() {
      swal('Error', 'Error al conectarse con el servidor', 'error');
    });
  });


  $(document).on('submit', '.form-ajax', function(e) {
    e.preventDefault();
    var $this = $(this);
    var data = $this.serialize();
    var url = $this.data('url');
    $.post(ajaxurl + '/' + url, data).then(function(res) {
      if (res.error) {
        swal('Error', res.message, 'error');
      } else {
        swal('Éxito', res.message, 'success').then(function() {
          $('.modal').modal('hide');
          $('.tabla-ajax').bootgrid('reload');
        });
      }
    }).fail(function() {
      swal('Error', 'Error al conectarse con el servidor', 'error');
    });
    if (existe('SelectDir')) {
      renderSelectDir();
      renderFiles();
    }
    $(this).reset();
  });

  $(document).on('submit', '.form-ajax-file', function(e) {
    e.preventDefault();
    var $this = $(this);
    var data = new FormData(this);
    var url = $this.data('url');
    $.ajax({
      type: 'POST',
      url: ajaxurl + '/' + url,
      data: data,
      processData: false,
      contentType: false
    }).then(function(res) {
      if (res.error) {
        swal('Error', res.message, 'error');
      } else {
        if (res.url) {
          swal('Éxito', res.message, 'success').then(function() {
            location.href = res.url;
          });
        } else {
          swal('Éxito', res.message, 'success');
          if (existe('SelectDir')) {
            renderFiles();
          }
        }
      }
    }).fail(function() {
      swal('Error', 'Error al conectarse con el servidor', 'error');
    });
  });

  $(document).on('submit', '.tag-ajax', function(e) {
    e.preventDefault();
    var $this = $(this);
    var data = $this.serialize();
    var url = $this.data('url');
    $.post(ajaxurl + '/' + url, data).then(function(res) {
      if (res.error) {
        swal('Error', res.message, 'error');
      } else {
        swal('Éxito', res.message, 'success').then(function() {
          Tags.Render();
        });
      }
    }).fail(function() {
      swal('Error', 'Error al conectarse con el servidor', 'error');
    });
    $(".tag-ajax")[0].reset();
  });

  $(document).on('click', '.tags-items', function(e) {
    console.log($(this));
    var id = $(this).data('id');
    var $this = $(this);
    swal({
        title: "Borrar registro",
        text: "¿Está seguro que desea borrar el registro?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(function(borrar) {
        if (borrar) {
          $.post($('.list-tags').data('url'), {
            'id': id
          }).then(function(res) {
            Tags.Render();
            if (res.error) {
              swal("¡Error!", res.mensaje, "error");
            } else {
              swal("¡Éxito!", "El registro se borró correctamente", "success");

            }
          }).fail(function() {
            swal('¡Error!', 'Ocurrió un error al conectarse con el servidor', 'error');
          });
        }
      });
  });


  $(document).on('submit', '.addMedia', function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    var $this = $(this);
  });

});



var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};


function genMap(data) {
  var myLatlng = new google.maps.LatLng(21.885731, -102.326319);
  var mapOptions = {
    zoom: 13,
    center: myLatlng,
    scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8ec3b9"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1a3646"
        }]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#64779e"
        }]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#334e87"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#283d6a"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#6f9ba5"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3C7680"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#304a7d"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#98a5be"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#2c6675"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#9d2a80"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#9d2a80"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#b0d5ce"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#98a5be"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#283d6a"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#3a4762"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#0e1626"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#4e6d70"
        }]
      }
    ]
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  /*
  if (data) {
    for (var i = 0; i < data.length; i++) {
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(data[i].Long) ,
          lng: parseFloat(data[i].Latitude)
        },
        map: map,
        title: "Marker" + (i+1),
        zIndex: i
      });
      }
    }*/

  }

function renderSelectDir() {
  $.post(ajaxurl + '/target/get_dir', {
    id: $('#SelectDir').data('id')
  }).then(function(res) {
    $('#SelectDir').html(res.data);
  }).fail(function() {});
}

function renderFiles() {
  $.post(ajaxurl + '/target/get_files', {
    id: $('#archivos').data('id')
  }).then(function(res) {
    $('#archivos').html(res.data);
  }).fail(function() {});
}
