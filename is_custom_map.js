// initMap
let map;

function initMap() {
    let autocomplete;
    const pager = (!isNaN(parseInt($('[data-is-map-paging]').attr('data-is-map-paging')))) ? parseInt($('[data-is-map-paging]').attr('data-is-map-paging')) : 5;
    const infoWindow = new google.maps.InfoWindow();
    partners_json = partners_json.filter(item => item['draft'] != true);

    const mapStyle = [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#333333"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        }
    ];

    const svgMarkerGreen = {
        path: "M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z",
        fillColor: "#00CB93",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#000000",
        rotation: 0,
        scale: 0.75,
        anchor: new google.maps.Point(15, 30),
    };
    
    const svgMarkerPink = {
        path: "M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z",
        fillColor: "#ff9fe1",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#000000",
        rotation: 0,
        scale: 0.75,
        anchor: new google.maps.Point(15, 30),
    };

    map = new google.maps.Map(
        document.querySelector('[data-is-map]'),
        {
            center: partners_json[0]['info'][0]['latlng'] ? partners_json[0]['info'][0]['latlng'] : { lat: 43.66429209197839, lng: -79.39200295726503 },
            zoom: 13,
            clickableIcons: false,
            styles: mapStyle,
        }
    );

    partners_json.forEach(partner => {
        const lat = parseFloat(partner.info[0]['latitude']);
        const lng = parseFloat(partner.info[0]['longitude']);
        if (!isNaN(lat) && !isNaN(lng)) {
            partner.info[0]['latlng'] = new google.maps.LatLng({
                lat: lat,
                lng: lng
            });

            partner.info[0]['marker'] = new google.maps.Marker({
                position: partner.info[0]['latlng'],
                map: map,
                icon: (partner.info[0]['discount'] ? svgMarkerPink : svgMarkerGreen),
                title: partner.info[0]['name']
            });
        } else {
            partner.info[0]['latlng'] = null;
            partner.info[0]['marker'] = null;
        }
    });

    const mapSearch = document.getElementById('is_map_search');

    autocomplete = new google.maps.places.Autocomplete(
        mapSearch,
        {
            componentRestrictions: {'country': ['CA']},
            fields: ['place_id', 'geometry', 'name'],
        }
    );

    google.maps.event.addDomListener(mapSearch, 'keydown', function(event) { 
        if (event.keyCode === 13) { 
            event.preventDefault(); 
        }
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            mapSearch.value = '';
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(12);
        }
    });

    function deleteMarkers() {
        const markers = partners_json.filter(item => typeof item['info'][0].marker === "object" && item['info'][0].marker != null);
        for (let i = 0; i < markers.length; i++) {
            markers[i]['info'][0]['marker'].setMap(null);
        }
    }
    
    function addMarkers(results) {
        for (let i = 0; i < results.length; i++) {
            if (typeof results[i]['info'][0]['latlng'] === "object" && results[i]['info'][0]['latlng'] != null) {
                results[i]['info'][0]['marker'] = new google.maps.Marker({
                    position: results[i]['info'][0]['latlng'],
                    map: map,
                    icon: (results[i]['info'][0]['discount'] ? svgMarkerPink : svgMarkerGreen),
                    title: results[i]['info'][0]['name']
                });

                results[i]['info'][0]['marker'].addListener("click", () => {
                    map.setZoom(13);
                    map.setCenter(results[i]['info'][0]['marker'].getPosition());
                    infoWindow.setContent("<div data-is-map-info>" + (results[i]['info'][0]['image'] ? "<div class=\"is-map__info__image\"><img src=\"" + results[i]['info'][0]['image'] + "\" alt=\"" + results[i]['info'][0].image_alt + "\" /></div>" : "") + "<div class=\"is-map__info__details\">" + (results[i]['info'][0].name && results[i]['info'][0].name.trim() != '' ? "<p class=\"is-map__info__title\">" + results[i]['info'][0].name + "</p>" : "") + (results[i]['info'][0].address ? '<p>' + results[i]['info'][0].address + '</p>' : '') + (results[i]['info'][0].discount ? "<p class=\"text-listing-discount\"><strong>" + results[i]['info'][0].discount + "</strong></p>" : "") + (results[i]['info'][0].website && results[i]['info'][0].website.trim() != '' ? "<a href=\"" + results[i]['info'][0].website + "\" target=\"_blank\" class=\"button w-button\">Visit Website</a>" : "") + "</div></div>");
                    infoWindow.open({
                      anchor: results[i]['info'][0]['marker'],
                      map,
                      shouldFocus: false,
                    });
                });
            } else {
                results[i]['info'][0]['marker'] = null;
            }
        }
    }
    
    function catName(id, collectionJson = partner_cat) {
        const cat = collectionJson.find(cat => cat.id == id);
        return (cat ? cat.name.trim() : '');
    }
    
    function pagination(pages) {
        const pagination = $('[data-is-pagination]');
        pagination.empty();

        for (let i = 0; i < pages; i++) {
            let x = document.createElement('span');
            x.setAttribute('data-is-map-pagination', i);
            if (i == 0) {
                x.classList.add('active');
                x.classList.add('first-page');
            } else if (i == pages - 1) {
                x.classList.add('last-page');
                x.classList.add('add-ellipses');
            }
            x.innerHTML = (i + 1);
            pagination.append(x);
        }

        if (pages > 0) {
            pagination.append('<span class="next-btn" data-is-map-pagination="1">Next Page</span>');
        }

        pagination.children().click(function (e) {
            pagination.children().removeClass('add-ellipses');
            
            if (parseInt($(this).attr('data-is-map-pagination')) > 3) {
                pagination.children('span.first-page').addClass('add-ellipses');
            }

            if (parseInt($(this).attr('data-is-map-pagination')) < pages - 3) {
                pagination.children('span.last-page').addClass('add-ellipses');
            }

            $('[data-is-map-current]').attr('data-is-map-current', parseInt($(this).attr('data-is-map-pagination')));
        });
    }

    function listPartners(results) {
        // Reset list and map
        const list = $('[data-is-map-list]');

        list.empty();
        deleteMarkers();
        $('[data-is-map-current]').attr('data-is-map-current', 0);
    
        addMarkers(results);

        let y, pages = 0;

        for (let i = 0; i < results.length; i++) {
            if (i % pager === 0) {
                y = document.createElement('div');
                y.setAttribute('data-is-map-page', i / pager);
                list.append(y);
                pages++;
            }
            
            const marker = results[i]['info'][0]['marker'];

            let x = document.createElement('div');
            x.setAttribute('data-is-map-list-item', 'true');

            if (typeof marker === "object" && marker != null) {
                x.classList.add('has-marker');
            }

            if(typeof results[i]['info'][0].image != undefined) {
                x.innerHTML = (results[i]['info'][0]['image'] ? "<div class=\"is-map__list-item__image\"><img src=\"" + results[i]['info'][0]['image'] + "\" alt=\"" + results[i]['info'][0].image_alt + "\" /></div>" : "") + "<div class=\"is-map__list-item__info\">" + (results[i]['info'][0].name && results[i]['info'][0].name.trim() != '' ? "<h3 class=\"blog_title\">" + results[i]['info'][0].name + "</h3>" : "") + (results[i]['info'][0].category ? "<p class=\"text-size-small text-style-allcaps\">" + catName(results[i]['info'][0].category) + "</p>" : "") + (results[i]['info'][0].address ? '<p>' + results[i]['info'][0].address + '</p>' : '') + (results[i]['info'][0].discount ? "<p class=\"text-listing-discount\"><strong>" + results[i]['info'][0].discount + "</strong></p>" : "") + (results[i]['info'][0].website && results[i]['info'][0].website.trim() != '' ? "<div class=\"button_wrapper\"><a href=\"" + results[i]['info'][0].website + "\" target=\"_blank\" class=\"button w-button\">Visit Website</a></div>" : "") + "</div></div>";
            }

            if(typeof marker === "object" && marker != null) { 
                x.addEventListener('click', function handleClick(event) {
                    map.setZoom(13);
                    map.setCenter(results[i]['info'][0]['marker'].getPosition());
                    infoWindow.setContent("<div data-is-map-info>" + (results[i]['info'][0]['image'] ? "<div class=\"is-map__info__image\"><img src=\"" + results[i]['info'][0]['image'] + "\" alt=\"" + results[i]['info'][0].image_alt + "\" /></div>" : "") + "<div class=\"is-map__info__details\">" + (results[i]['info'][0].name && results[i]['info'][0].name.trim() != '' ? "<p class=\"is-map__info__title\">" + results[i]['info'][0].name + "</p>" : "") + (results[i]['info'][0].address ? '<p>' + results[i]['info'][0].address + '</p>' : '') + (results[i]['info'][0].discount ? "<p class=\"text-listing-discount\"><strong>" + results[i]['info'][0].discount + "</strong></p>" : "") + (results[i]['info'][0].website && results[i]['info'][0].website.trim() != '' ? "<a href=\"" + results[i]['info'][0].website + "\" target=\"_blank\" class=\"button w-button\">Visit Website</a>" : "") + "</div></div>");
                    infoWindow.open({
                      anchor: results[i]['info'][0]['marker'],
                      map,
                      shouldFocus: false,
                    });
                });
            }
            
            y.append(x);
        }

        pagination(pages);
    }

    // Listen to page changes
    function changePage(mutationList) {
        for (const mutation of mutationList) {
            if (mutation.type !== "attributes" && mutation.attributeName != "data-is-map-current") {
                continue;
            } else {
                const currentActive = parseInt(mutation.target.attributes['data-is-map-current'].value);
                $('[data-is-map-page], [data-is-map-pagination]').removeClass('active').removeClass('current');
                $('[data-is-map-page=' + currentActive + '], [data-is-map-pagination=' + currentActive + ']').addClass('active').addClass('current');
                $('[data-is-map-pagination=' + (currentActive + 1) + '], [data-is-map-pagination=' + (currentActive + 2) + '], [data-is-map-pagination=' + (currentActive - 1) + '], [data-is-map-pagination=' + (currentActive - 2) + ']').addClass('active');
                
                if ($('[data-is-map-page=' + (currentActive + 1) + ']').length > 0) {
                    $('[data-is-map-pagination].next-btn').addClass('active').attr('data-is-map-pagination', (currentActive + 1));
                } else {
                    $('[data-is-map-pagination].next-btn').removeClass('active')
                }
                break;
            }
        }
    }

    const listObserver = new MutationObserver(changePage);
    listObserver.observe(document.querySelector("[data-is-map-list]"), { attributeFilter: ["data-is-map-current"] });

    if (partner_cat.length > 0) {
        partner_cat.unshift({'id': 'discount', 'name': 'Discount'});
        partner_cat.unshift({'id': 'all', 'name': 'All'});

        for (i = 0; i < partner_cat.length; i++) {
            $('[data-is-map-filters]').prepend('<span class="guide_listings_form' + ((partner_cat[i].id === 'all') ? ' active' : '') + '" data-is-map-filter="' + partner_cat[i].id + '">' + partner_cat[i].name.trim() + '</span>');
        }
        
        let filters = $('[data-is-map-filter]');
        filters.click(function(){
            filters.removeClass('active');
            $(this).addClass('active');
            
            const cat = $(this).attr('data-is-map-filter').replace('&', '&amp;');
            let filteredList;

            switch (cat) {
                case 'all':
                    filteredList = partners_json;
                    break;
                case 'discount':
                    filteredList = partners_json.filter(item => typeof item['info'][0].discount === "string" && item['info'][0].discount.trim().length !== 0);
                    break;
                default:
                    filteredList = partners_json.filter(item => item['info'][0].category == cat);
            }

            listPartners(filteredList);
            map.setCenter((typeof filteredList[0]['info'][0]['latlng'] === "object" && filteredList[0]['info'][0]['latlng'] != null) ? filteredList[0]['info'][0]['latlng'] : { lat: 43.66429209197839, lng: -79.39200295726503 });
        }).last().click();
    }
}
