//GESTION CSS

//Import des thématiques et des icônes de couches
const couches =
{
  "Restauration" :
  [
    ["Restaurants Universitaires", "Cafétarias", "Food truck", "Tables de pique-nique", "Machines à café"],
    "#e03c31",
    {

    },
  ],
  "Amphithéâtres et salles" :
  [
    ["Amphithéâtres", "Salles examen", "Impression et studio graphique"],
    "#FABC2A",
    {

    },
  ],
  "Mobilités" :
  [
    ["Parkings", "Parkings PMR", "Parkings à vélos", "Abris à vélos", "Travaux"],
    "#2b4794",
    {
      "Métros" : "https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-metro-topologie-stations-td&q=&rows=100&facet=id&facet=codeinseecommune&facet=nomcommune&facet=codetechniquestationlignea&format=geojson",
      "Bus" : "https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-topologie-pointsarret-td&q=code%3A%221609%22+OR+code%3A%221160%22+OR+code%3A%221610%22+OR+code%3A%221175%22+OR+code%3A%221312%22+OR+code%3A%221176%22+OR+code%3A%221204%22+OR+code%3A%221203%22+OR+code%3A%221177%22+OR+code%3A%221313%22+OR+code%3A%221292%22+OR+code%3A%221202%22+OR+code%3A%221178%22+OR+code%3A%221604%22+OR+code%3A%221603%22+OR+code%3A%229217%22+OR+code%3A%221291%22+OR+code%3A%221314%22+OR+code%3A%221687%22+OR+code%3A%221688%22+OR+code%3A%221522%22+OR+code%3A%221528%22+OR+code%3A%221201%22+OR+code%3A%221432%22&rows=100&sort=nom&facet=nom&facet=codeinseecommune&facet=nomcommune&facet=estaccessiblepmr&facet=mobilier&facet=code&format=geojson",
      "VLS" : "https://data.explore.star.fr/api/records/1.0/search/?dataset=vls-stations-etat-tr&q=&rows=60&facet=nom&facet=etat&facet=nombreemplacementsactuels&facet=nombreemplacementsdisponibles&facet=nombrevelosdisponibles&format=geojson",
      "Parcs relais" : "https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=nom%3A%27Les+Pr%C3%A9ales%27&facet=idparc&facet=nom&facet=etatouverture&facet=etatremplissage%E2%80%A2&format=geojson"
    },
  ],
  "Santé" :
  [
    ["Défibrillateurs", "Distributeurs de protection hygiéniques"],
    "#009F68",
    {

    },
  ],
  "Services" :
  [
    ["Copieurs", "Toilettes", "Conteneurs poubelles"],
    "#DDA35E",
    {

    },
  ],
  "Évènements" :
  [
    ["Évènements"],
    "#000",
    {

    },
  ],
};

// Gestion des accents dans les thèmes et couches
const accentsMap = new Map
([
  ["A", "Á|À|Ã|Â|Ä"],
  ["a", "á|à|ã|â|ä"],
  ["E", "É|È|Ê|Ë"],
  ["e", "é|è|ê|ë"],
  ["I", "Í|Ì|Î|Ï"],
  ["i", "í|ì|î|ï"],
  ["O", "Ó|Ò|Ô|Õ|Ö"],
  ["o", "ó|ò|ô|õ|ö"],
  ["U", "Ú|Ù|Û|Ü"],
  ["u", "ú|ù|û|ü"],
  ["C", "Ç"],
  ["c", "ç"],
  ["N", "Ñ"],
  ["n", "ñ"]
]);

const reducer = (acc, [key]) =>
  acc.replace(new RegExp(accentsMap.get(key), "g"), key);

const removeAccents = (text) => [...accentsMap].reduce(reducer, text);

// Rename in a new couche
const couches_abr =
{
  ...couches
};

for (keys in couches_abr)
{
  delete Object.assign(couches_abr, {[removeAccents(keys).toLowerCase().replace(/\s+/g, '')] : couches[keys]})[keys];
}

// Fonction pour ajouter un bloc
function ajouter(elementtocreate, id, classe, elementtoappend, text = '', src = '', style = '')
{
  var element = document.createElement(elementtocreate);

  element.id = id;
  element.className = classe;
  element.textContent = text;
  element.src = src;
  element.style = style;

  var append = document.getElementById(elementtoappend);
  append.appendChild(element);
};

// Fonction pour chercher les icônes
function chercher (chemin, objet)
{
  return lien = chemin + removeAccents(objet).toLowerCase().replace(/\s+/g, '')
}

// Ajout des blocs de thématiques
for (var i = 0; i < Object.keys(couches).length; i++)
{
  let theme = Object.keys(couches_abr)[i];
  ajouter('div', theme, 'theme', 'layers-menu', Object.keys(couches)[i]);

  ajouter('div', theme.concat('_', "container"), 'layers-container', theme);

  // Ajout des blocs de couches
  for (var j = 0; j < couches_abr[theme][0].length; j++)
  {
    var couche = removeAccents(couches_abr[theme][0][j]).toLowerCase().replace(/\s+/g, '');

    ajouter('div', theme + '_' + couche, 'couche', theme.concat('_', "container"));

    ajouter('div', theme + '_' + couche + '_icon', 'rectangle', theme + '_' + couche);

    ajouter('img', theme + '_' + couche + '_fond', '', theme + '_' + couche + '_icon', '', chercher('icons/layers-icons/svg/', 'fond.svg'), 'width:100%; height:100%; clip-path: inset(0% 0% 0% 0% round 20px); position:absolute;');

    ajouter('img', theme + '_' + couche + '_picto', '', theme + '_' + couche + '_icon', '', chercher('icons/layers-icons/svg/', couches_abr[theme][0][j] + '.svg'), 'width:55%; height:55%; position:absolute;');

    ajouter('div', theme + '_' + couche + '_border', 'border', theme + '_' + couche + '_icon')

    ajouter('div', theme + '_' + couche + '_nom', 'nom', theme + '_' + couche, couches_abr[theme][0][j]);
  }
  for (var j = 0; j < Object.keys(couches_abr[theme][2]).length; j++) {
    var couche = removeAccents(Object.keys(couches_abr[theme][2])[j]).toLowerCase().replace(/\s+/g, '');

    ajouter('div', theme + '_' + couche, 'couche', theme.concat('_', "container"));

    ajouter('div', theme + '_' + couche + '_icon', 'rectangle', theme + '_' + couche);

    ajouter('img', theme + '_' + couche + '_fond', '', theme + '_' + couche + '_icon', '', chercher('icons/layers-icons/svg/', 'fond.svg'), 'width:100%; height:100%; clip-path: inset(0% 0% 0% 0% round 20px); position:absolute;');

    ajouter('img', theme + '_' + couche + '_picto', '', theme + '_' + couche + '_icon', '', chercher('icons/layers-icons/svg/', Object.keys(couches_abr[theme][2])[j] + '.svg'), 'width:55%; height:55%; position:absolute;');

    ajouter('div', theme + '_' + couche + '_border', 'border', theme + '_' + couche + '_icon')

    ajouter('div', theme + '_' + couche + '_nom', 'nom', theme + '_' + couche, Object.keys(couches_abr[theme][2])[j]);
  }
};

//Resize au changement d'orientation
$(window).on('orientationchange', function()
{
  document.body.style.display='none';
  document.body.offsetHeight; //cause a reflow
  document.body.style.display='block'; //cause a repaint
});

//Interaction pour l'icône de Géolocalisation
$('#layerbutton').click(function()
{
  if($("#menu").hasClass("slideIn"))
  {
    $("#menu").toggleClass("slideOut");
  }
  else
  {
    $("#menu").toggleClass("slideIn");
  }
});

$("#layerclear").click(function()
{
  for(i = 0; i < layers.length; i++)
  {
    clickedLayer = layers[i];
    map.setLayoutProperty
    (
      clickedLayer, 'visibility', 'none'
    );
    $(".border").css({"border" : "none"});
    popup.remove();
  }
});

//Interaction pour l'icône 2D/3D

$('#state').text('3D')

$('#state').click(function()
{
  if($('#state').text() == '3D')
  {
    $('#state').text('2D');
    map.setPaintProperty
    (
      'batiments-layer', 'fill-extrusion-height', ['get', 'h_faitage']
    );
    map.setMaxPitch(50);
    map.easeTo({bearing:30, pitch:50});
  }
  else
  {
    $('#state').text('3D');
    map.setPaintProperty
    (
      'batiments-layer', 'fill-extrusion-height', 0
    );
    map.easeTo({bearing:0, pitch:0})
    map.setMaxPitch(0);
  }
});

//GESTION CARTOGRAPHIQUE
var map = new maplibregl.Map(
{
  container: 'map',
  style:'https://api.maptiler.com/maps/basic/style.json?key=PQt7vayjzhEbrIotg7qI',
  bounds:[[-1.645557606767821, 48.11380355348846], [-1.631991647585447, 48.12536965207949]],
  DoubleClickZoomHandler: true,
  antialias : true,
  maxPitch:0,
});

map.on("load", function()
{

  map.addLayer({
    'id':'batiments-layer',
    'type' : 'fill-extrusion',
    'source' :
    {
      'type' : 'geojson',
      'data' : 'https://raw.githubusercontent.com/TmMnt/AMS/main/RM_bati_beaulieu.geojson'
    },
    'layout' :
    {
      'visibility' : 'visible'
    },
    'paint':
    {
      'fill-extrusion-color': '#565656',
      'fill-extrusion-height': 0,
      'fill-extrusion-opacity': 0.90,
      'fill-extrusion-base': 0
    }
  });

  map.addSource('batiments-labels-layer', {
    'type' : 'geojson',
    'data' : 'https://raw.githubusercontent.com/TmMnt/AMS/main/RM_bati_beaulieu_labels.geojson'
  });;

  map.addLayer({
    'id':'batiments-labels-layer',
    'type' : 'symbol',
    'source' : 'batiments-labels-layer',
    'layout' :
    {
      'visibility' : 'visible',
      'text-field' : '{batiment}',
      'text-allow-overlap': true,
      'text-font' : ['Open Sans Bold'],
      'text-size' : 14,
      'text-anchor' : 'center'
    },
    'paint':
    {
      'text-color' : '#332823',
      'text-halo-color' : '#fff',
      'text-halo-width' : 1,
      'text-opacity' :
      [
        'interpolate',
        ['linear'],
        ['zoom'],
        16,
        0,
        17,
        1
      ]
    }
  });

  file = 'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-metro-topologie-parcours-td&q=senscommercial%3A%27Retour%27&facet=nomcourtligne&facet=senscommercial&facet=type&facet=nomarretdepart&facet=nomarretarrivee&facet=estaccessiblepmr&format=geojson';
  jQuery.when(
    jQuery.getJSON(file)
  ).done(function(json) {
    for (i = 0; i < json.features.length; i++) {
      json.features[i].geometry = json.features[i].properties.parcours;
    };
    map.addLayer(
    {
      'id': 'line-metros-layer',
      'type':'line',
      'source':
      {
        'type': 'geojson',
        'data': json
      },
      'layout':
      {
        'visibility' : 'none',
        'line-join':'round',
        'line-cap':'round'
      },
      'paint' :
      {
        'line-color' : ['get', 'couleurtracetrace'],
        'line-width' : 3,
      }
    });

  });

  file = 'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-topologie-parcours-td&q=nomcourtligne%3A%22C4%22+OR+nomcourtligne%3A%22C5%22+OR+nomcourtligne%3A%22C6%22+OR+nomcourtligne%3A%2210%22+OR+nomcourtligne%3A%2214%22+OR+nomcourtligne%3A%2267%22&rows=100&sort=idligne&facet=idligne&facet=nomcourtligne&facet=senscommercial&facet=type&facet=nomarretdepart&facet=nomarretarrivee&facet=estaccessiblepmr&format=geojson';
  jQuery.when(
    jQuery.getJSON(file)
  ).done(function(json) {
    for (i = 0; i < json.features.length; i++) {
      json.features[i].geometry = json.features[i].properties.parcours;
    };
    map.addLayer(
    {
      'id': 'line-bus-layer',
      'type':'line',
      'source':
      {
        'type': 'geojson',
        'data': json
      },
      'layout':
      {
        'visibility' : 'none',
        'line-join':'round',
        'line-cap':'round'
      },
      'paint' :
      {
        'line-color' : ['get', 'couleurtrace'],
        'line-width' : 2,
        'line-opacity' : 0.75
      }
    });

  });

  let pp ='';
  if(window.matchMedia("(min-width:1025px)").matches)
  {
    pp = '-100pp.png';
  } else
  {
    pp = '-72pp.png';
  };
  (async function()
  {
    for (let theme of Object.keys(couches))
    {
      for (let couche of couches[theme][0])
      {
        let s = await map.loadImage(
          chercher('icons/layers-icons/png/', couche + pp), function(error, image)
          {
            if(error) throw (error);
            map.addImage('custom-marker-'+removeAccents(couche).toLowerCase().replace(/\s+/g, ''), image);
            map.addSource(removeAccents(couche).toLowerCase().replace(/\s+/g, ''),
            {
              type:'geojson',
              data: chercher('https://raw.githubusercontent.com/TmMnt/AMS/main/', couche + '.geojson'),
              cluster:true,
              clusterMaxZoom: 16
            });
            map.addLayer(
            {
              'id': removeAccents(couche).toLowerCase().replace(/\s+/g, '') + '-layer',
              'type':'symbol',
              'source':removeAccents(couche).toLowerCase().replace(/\s+/g, ''),
              'layout':
              {
                'visibility' : 'none',
                'icon-allow-overlap':true,
                'icon-image':'custom-marker-'+removeAccents(couche).toLowerCase().replace(/\s+/g, ''),
                'icon-anchor':'bottom',
                'text-field' : '{point_count_abbreviated}',
                'text-font' : ['Open Sans Bold'],
                'text-size' : 14,
                'text-offset' : [0, 1],
                'text-anchor' : 'bottom'
              },
              'paint' :
              {
                'text-color' : couches[theme][1]
              },
              'filter':['has', 'point_count']
            });
            map.addLayer(
            {
              'id': removeAccents(couche).toLowerCase().replace(/\s+/g, '') + '-layer-unclustered',
              'type':'symbol',
              'source':removeAccents(couche).toLowerCase().replace(/\s+/g, ''),
              'layout':
              {
                'visibility' : 'none',
                'icon-allow-overlap':true,
                'icon-image':'custom-marker-'+removeAccents(couche).toLowerCase().replace(/\s+/g, ''),
                'icon-anchor':'bottom',
              },
              'filter' : ['!', ['has', 'point_count']]
            });
          }
        );
      }
    }
  })();

  (async function()
  {
    for (let theme of Object.keys(couches_abr))
    {
      for (let couche of Object.keys(couches_abr[theme][2]))
      {
        let s = await map.loadImage(
          chercher('icons/layers-icons/png/', couche + pp), function(error, image)
          {
            if(error) throw (error);
            map.addImage('custom-marker'+removeAccents(couche).toLowerCase().replace(/\s+/g, ''), image);
            map.addSource(couche,
            {
              type:'geojson',
              data: couches_abr[theme][2][couche]
            });
            map.addLayer(
            {
              'id': removeAccents(couche).toLowerCase().replace(/\s+/g, '') + '-layer',
              'type':'symbol',
              'source':couche,
              'layout':
              {
                'visibility' : 'none',
                'icon-allow-overlap':false,
                'icon-image':'custom-marker'+removeAccents(couche).toLowerCase().replace(/\s+/g, ''),
                'icon-anchor':'bottom'
              },
            });
          }
        );
      }
    }
  })();

  map.addControl(
    new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
  );

  var nav = new maplibregl.NavigationControl({showZoom:false});
  map.addControl(nav, 'top-right');

});

if(window.matchMedia("(min-width:1025px)").matches) {
  var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: true,
    offset : 42,
    maxWidth: 'calc(30%)',
    anchor: 'bottom'
  });
  var popup_bat = new maplibregl.Popup({
    className: 'bat',
    closeButton: false,
    closeOnClick: true,
    offset: 0,
    maxWidth: 'calc(30%)',
    anchor: 'bottom'
  });
} else {
  var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: true,
    offset : 30,
    maxWidth: 'calc(100% - 2rem)',
    anchor: 'bottom'
  });
  var popup_bat = new maplibregl.Popup({
    className: 'bat',
    closeButton: false,
    closeOnClick: true,
    offset: 0,
    maxWidth: 'calc(100% - 2rem)',
    anchor: 'bottom'
  });
}

// Interaction couche
const layers = []

$(".rectangle").click(function(event)
{
  id = '#' + event.currentTarget.id;
  border = '#' + event.currentTarget.id.replace('_icon', '_border');
  clickedLayer = event.currentTarget.id.split("_");
  clickedSource = clickedLayer[1];
  clickedLayerUnclustered = clickedLayer[1] + '-layer-unclustered';
  clickedLayer = clickedLayer[1] + '-layer';
  theme = event.currentTarget.id.split("_")[0];
  const visibility = map.getLayoutProperty(
    clickedLayer,
    'visibility'
  );

  if (visibility === 'visible')
  {
    map.setLayoutProperty
    (
      clickedLayer, 'visibility', 'none'
    );
    map.setLayoutProperty
    (
      clickedLayerUnclustered, 'visibility', 'none'
    );

    $(border).css({"border" : "none"});

    layers.splice(layers.indexOf(clickedLayer), 1);
    layers.splice(layers.indexOf(clickedLayerUnclustered), 1);
    popup.remove();

    if (clickedLayer == 'bus-layer' || clickedLayer == 'metros-layer') {
      var line = 'line-' + clickedLayer;

      map.setLayoutProperty
      (
        line,
        'visibility',
        'none'
      );
      layers.splice(layers.indexOf(line), 1);
    }
  } else
  {
    switch (clickedLayer) {
      case 'bus-layer':
      case 'metros-layer':
      var line = 'line-' + clickedLayer;

      map.setLayoutProperty
      (
        line,
        'visibility',
        'visible'
      );
      layers.push(line);
      map.on('mouseenter', clickedLayer, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', layers[layers.indexOf(e.features[0].layer.id)], (e) => {
          map.easeTo({
            center: e.features[0].geometry.coordinates,
          });
          var description =
          '<div class="nom">' +  e.features[0].properties.nom + '</div>' +
          '<a href=https://www.star.fr/ target=_blank>STAR</a>'
          popup.setLngLat(e.features[0].geometry.coordinates).setHTML(description).addTo(map);
        });
      });
      map.on('mouseleave', clickedLayer, (e) => {
        map.getCanvas().style.cursor = ''
      });

      map.moveLayer(clickedLayer);

      layers.push(clickedLayer);

      var color = couches_abr[theme][1];

      $(border).css({"border" : "3px solid" + color});

      map.setLayoutProperty
      (
        clickedLayer,
        'visibility',
        'visible'
      );
      break;
      case 'vls-layer' :
      map.on('mouseenter', clickedLayer, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', layers[layers.indexOf(e.features[0].layer.id)], (e) => {
          map.easeTo({
            center: e.features[0].geometry.coordinates,
          });
          var description =
          '<div class="nom">' +  e.features[0].properties.nom + '</div>' +
          '<div class="valeur">' + e.features[0].properties.nombrevelosdisponibles + ' vélos disponibles</div>' +
          '<a href=https://www.star.fr/ target=_blank>STAR</a>'
          popup.setLngLat(e.features[0].geometry.coordinates).setHTML(description).addTo(map);
        });
      });
      map.on('mouseleave', clickedLayer, (e) => {
        map.getCanvas().style.cursor = ''
      });

      map.moveLayer(clickedLayer);

      layers.push(clickedLayer);

      var color = couches_abr[theme][1];

      $(border).css({"border" : "3px solid" + color});

      map.setLayoutProperty
      (
        clickedLayer,
        'visibility',
        'visible'
      );
      break;
      case 'parcsrelais-layer' :
      map.on('mouseenter', clickedLayer, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', layers[layers.indexOf(e.features[0].layer.id)], (e) => {
          map.easeTo({
            center: e.features[0].geometry.coordinates,
          });
          var description =
          '<div class="nom">' +  e.features[0].properties.nom + '</div>' +
          '<div class="valeur">' + e.features[0].properties.capaciteparking + ' places</div>' +
          '<a href=https://www.star.fr/ target=_blank>STAR</a>'
          popup.setLngLat(e.features[0].geometry.coordinates).setHTML(description).addTo(map);
        });
      });
      map.on('mouseleave', clickedLayer, (e) => {
        map.getCanvas().style.cursor = ''
      });

      map.moveLayer(clickedLayer);

      layers.push(clickedLayer);

      var color = couches_abr[theme][1];

      $(border).css({"border" : "3px solid" + color});

      map.setLayoutProperty
      (
        clickedLayer,
        'visibility',
        'visible'
      );
      break;
      case 'evenements-layer' :
      map.moveLayer(clickedLayer);

      layers.push(clickedLayer);
      layers.push(clickedLayerUnclustered);

      var color = couches_abr[theme][1];

      $(border).css({"border" : "3px solid" + color});

      map.setLayoutProperty
      (
        clickedLayer,
        'visibility',
        'visible'
      );
      map.setLayoutProperty
      (
        clickedLayerUnclustered,
        'visibility',
        'visible'
      );

      map.on('mouseenter', clickedLayer, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', clickedLayer, (e) => {
          var features = map.queryRenderedFeatures(e.point, {
            layers: [clickedLayer]
          });
          var clusterId = features[0].properties.cluster_id;
          var pointCount = features[0].properties.point_count;
          map.getSource(clickedSource).getClusterChildren(clusterId, function(error, features) {
            console.log(features);
            for (var i = 0; i < features.length; i++) {
              if (features[i].properties.cluster) {
                console.log('continue');
              } else {
                console.log('print');
              }
            }
          });
          map.getSource(clickedSource).getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
          );
        });
      });
      map.on('mouseenter', clickedLayerUnclustered, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', layers[layers.indexOf(e.features[0].layer.id)], (e) => {

          map.easeTo({
            center: e.features[0].geometry.coordinates,
          });
          var description = '';
          if (e.features[0].properties["Titre - FR"]) {
            description += '<div class="nom">' +  e.features[0].properties["Titre - FR"] + '</div>'
          };
          if (e.features[0].properties.Thématique) {
            description += '<div class="valeur">' + e.features[0].properties.Thématique + '</div>'
          };
          if (e.features[0].properties["Description courte - FR"]) {
            description += '<div class="message">' + e.features[0].properties["Description courte - FR"] + '</div>'
          };
          if(e.features[0].properties.Permalien) {
            description += 'Lien :'+'<a href='+e.features[0].properties.Permalien+' target=_blank>'+e.features[0].properties["Titre - FR"]+'</a>';
          }

          if (description != '') {
            popup.setLngLat(e.features[0].geometry.coordinates).setHTML(description).addTo(map);
          };
        });
      });
      map.on('mouseleave', clickedLayer, (e) => {
        map.getCanvas().style.cursor = ''
      });
      map.on('mouseleave', clickedLayerUnclustered, (e) => {
        map.getCanvas().style.cursor = ''
      });
      break;
      default :
      map.moveLayer(clickedLayer);

      layers.push(clickedLayer);
      layers.push(clickedLayerUnclustered);

      var color = couches_abr[theme][1];

      $(border).css({"border" : "3px solid" + color});

      map.setLayoutProperty
      (
        clickedLayerUnclustered,
        'visibility',
        'visible'
      );

      map.setLayoutProperty
      (
        clickedLayer,
        'visibility',
        'visible'
      );

      map.on('mouseenter', clickedLayer, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', clickedLayer, (e) => {
          var features = map.queryRenderedFeatures(e.point, {
            layers: [clickedLayer]
          });
          var clusterId = features[0].properties.cluster_id;
          map.getSource(clickedSource).getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              });
            }
          );
        });
      });
      map.on('mouseenter', clickedLayerUnclustered, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        map.on('click', layers[layers.indexOf(e.features[0].layer.id)], (e) => {

          map.easeTo({
            center: e.features[0].geometry.coordinates,
          });
          var description = '';
          if (e.features[0].properties.info1) {
            description += '<div class="nom">' +  e.features[0].properties.info1 + '</div>'
          };
          if (e.features[0].properties.info2) {
            description += '<div class="valeur">' + e.features[0].properties.info2 + '</div>'
          };
          if (e.features[0].properties.info3) {
            description += '<div class="message">' + e.features[0].properties.info3 + '</div>'
          };
          if(e.features[0].properties.URL) {
            description += 'Lien : '+'<a href='+e.features[0].properties.URL+' target=_blank>'+e.features[0].properties.info1+'</a>';
          }

          if (description != '') {
            popup.setLngLat(e.features[0].geometry.coordinates).setHTML(description).addTo(map);
          };
        });
      });
      map.on('mouseleave', clickedLayer, (e) => {
        map.getCanvas().style.cursor = ''
      });
      map.on('mouseleave', clickedLayerUnclustered, (e) => {
        map.getCanvas().style.cursor = ''
      });

    }
  }
});

const autoCompleteJS = new autoComplete(
  {
    placeHolder: "Rechercher un batiment...",
    data: {
      src: async (query) => {
        try {
          // Fetch Data from external Source
          const source = await fetch('https://raw.githubusercontent.com/TmMnt/AMS/main/RM_bati_beaulieu_labels.geojson');
          // Data is array of `Objects` | `Strings`
          const pre_data = await source.json();
          data = [];
          for (var i = 0; i < pre_data.features.length; i++) {
            data.push('Batiment ' + pre_data.features[i].properties.batiment);
          }
          return data;
        } catch (error) {
          return error;
        }
      },
    },
    resultItem:
    {
      highlight:
      {
        render: true
      }
    },
    events:
    {
      input:
      {
        open()
        {
          autoCompleteJS.list.style.bottom = autoCompleteJS.input.offsetHeight + 8 + "px";
        },
      },
    },
    resultsList:
    {
      element: (list, data) =>
      {
        if (!data.results.length)
        {
          // Create "No Results" message list element
          const message = document.createElement("div");
          message.setAttribute("class", "no_result");
          // Add message text content
          message.innerHTML = `<span>Pas de résultat(s) pour "${data.query}" :(</span>`;
            // Add message list element to the list
            list.appendChild(message);
          }
        },
        noResults: true,
        maxResults: 5
      },
      searchEngine:'loose'
  });

  autoCompleteJS.input.addEventListener("selection", function (event) {
    const feedback = event.detail;
    autoCompleteJS.input.blur();
    // Prepare User's Selected Value
    const selection = feedback.selection.value;
    // Render selected choice to selection div
    // Replace Input value with the selected value
    autoCompleteJS.input.value = selection;
    // Console log autoComplete data feedback
    source = map.querySourceFeatures('batiments-labels-layer');
    let filteredFeatures = source.filter(function (feature) {
      return 'Batiment ' + feature.properties.batiment == selection;
    });
    map.easeTo({
      center: filteredFeatures[0].geometry.coordinates,
      zoom:17
    });
    var description =
    '<div class="nom">' + 'Bâtiment ' + filteredFeatures[0].properties.batiment + '</div>' +
    '<div class="message">' +  filteredFeatures[0].properties.batiment_u + '</div>' +
    '<a href=https://www.star.fr/ target=_blank>Lien vers le UFR</a>'
    popup_bat.setLngLat(filteredFeatures[0].geometry.coordinates).setHTML(description).addTo(map);
  });

//TEST
// file = 'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-topologie-dessertes-td&q=idarret%3A%221609%22&sort=idarret&facet=libellecourtparcours&facet=nomcourtligne&facet=nomarret&facet=estmonteeautorisee&facet=estdescenteautorisee&format=geojson';
// jQuery.when(
//   jQuery.getJSON(file)
// ).done(function(json) {
//   var ligne = [];
//   for (i = 0; i < json.features.length;i++) {
//     ligne.push(json.features[i].properties.nomcourtligne);
//     var unique = [... new Set(ligne)];
//   }
//   file = 'https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-lignes-pictogrammes-dm&q=resolution%3A%221%3A30%22&rows=174&facet=nomcourtligne&facet=date&facet=resolution&format=geojson';
//   jQuery.when(
//     jQuery.getJSON(file)
//   ).done(function(json) {
//     console.log(json);
//     for (var i = 0; i < unique.length; i++) {
//       let filteredFeatures = json.features.filter(function (feature) {
//         return feature.properties.nomcourtligne == unique[i];
//       });
//       popup.setLngLat([-1.6531381, 48.1144442]).setHTML(filteredFeatures[0].properties.idligne).addTo(map);
//       console.log(filteredFeatures[0]);
//     }
//   });
// });


// const filterInput = document.getElementById('search-input');
// filterInput.addEventListener('keyup', (e) => {
//   if (event.keyCode === 13) {
//     const value = e.target.value.trim().toLowerCase();
//     const features = map.querySourceFeatures('batiments-labels-layer');
//     // for (var i = 0; i < features.length; i++) {
//     let filteredFeatures = features.filter(function (feature) {
//       return feature.properties.batiment == value;
//     });
//     // };
//     map.easeTo({
//       center: filteredFeatures[0].geometry.coordinates,
//       zoom: 16
//     });
//
//   }
// });
