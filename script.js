$(function () {
    // Some useful strings to reduce the size of the script.
    var usd = 'usd';

    var black = 'black';
    var blue = 'blue';
    var red = 'red';
    // var silver = 'silver';
    var midnight = 'midnight';
    var white = 'white';
    // var obsidian = 'obsidian';

    var aero = 'aero';
    var sport = 'sport';

    var long = 'long';
    var standard = 'standard';

    // Setting default variables.
    var currency = usd;
    var current_lang = 'en_US';

    var import_tax = 1;
    var vat = 1;
    var incentive = 0;

    var color = black;
    var wheels = aero;
    var premium = true;
    var white_interior = false;
    var battery = long;
    var autopilot = false;
    // var self_driving = false;
    var dual = false;
    var performance = false;
    var performance_upgrade = false;

    var usd_to_eur = 0.881475;
    var change_margin = 1.03;

    var prices = {
        usd: {
            'base': 35000,
            'wheels': {
                'aero': 0,
                'sport': 1500,
            },
            'paint': {
                black: 0,
                blue: 1500,
                red: 2500,
                silver: 1500,
                midnight: 1500,
                white: 2000,
                obsidian: 1500
            },
            'battery': {
                standard: 0,
                mid: 2000,
                long: 9000
            },
            'premium': 5000,
            'white_interior': 1500,
            'autopilot': 5000,
            // 'self_driving': 3000,
            'dual': 5000,
            'performance': 10000,
            'performance_upgrade': 5000,
            'dest_doc': 1200
        },
        eur: {
            'base': Math.round(35000 * usd_to_eur * change_margin),
            'wheels': {
                aero: 0,
                sport: 1600,
            },
            'paint': {
                black: 0,
                blue: 1600 / 1.2,
                red: 2600 / 1.2,
                silver: 1600 / 1.2,
                midnight: 1600 / 1.2,
                white: 2000 / 1.2,
                obsidian: 1600 / 1.2
            },
            'battery': {
                standard: 0,
                mid: Math.round(2000 * usd_to_eur * change_margin),
                long: Math.round(9000 * usd_to_eur * change_margin)
            },
            'premium': Math.round(5000 * usd_to_eur * change_margin),
            'white_interior': Math.round(1500 * usd_to_eur * change_margin),
            'autopilot': 5300,
            // 'self_driving': Math.round(3000 * usd_to_eur * change_margin),
            'dual': Math.round(5000 * usd_to_eur * change_margin),
            'performance': Math.round(10000 * usd_to_eur * change_margin),
            'performance_upgrade': Math.round(5000 * usd_to_eur * change_margin),
            'dest_doc': Math.round(1500 * usd_to_eur * change_margin)
        }
    };

    var lang = {
        'en_US': {
            'thou_sep': ',',
            'yes': 'Yes',
            'no': 'No',
            'title': 'Tesla Model 3 calculator',
            'h1': 'Configure your Tesla Model 3',
            'included': 'Included',
            'wheels': {
                aero: 'Aero',
                sport: 'Sport',
            },
            'paint': {
                black: 'Solid Black',
                blue: 'Deep Blue Metallic',
                red: 'Red Multi-Coat',
                // silver: 'Silver Metallic',
                midnight: 'Midnight Silver Metallic',
                white: 'Pearl White Multi-Coat',
                // obsidian: 'Obsidian Black Metallic'
            },
            'battery': {
                standard: 'Standard (220 miles)',
                mid: 'Mid range (260 miles)',
                long: 'Long Range (310 miles)'
            },
            'data': {
                'color': 'Color',
                'wheels': 'Wheels',
                'premium': 'Premium Upgrades',
                'white_interior': 'White Interior',
                'battery': 'Battery',
                'autopilot': 'Enhanced Autopilot',
                // 'self_driving': 'Full Self-Driving',
                'dual': 'All Wheel Drive',
                'performance': 'Performance',
                'performance_upgrade': 'Performance Upgrade',
            },
            'form': {
                'dest_doc': 'Destination &amp; Doc Fee',
                'import': 'Import Tax',
                'total_no_vat': 'Total (no VAT)',
                'vat': 'VAT',
                'incentive': 'Direct incentive',
                'total_vat': "Total"
            },
            'notes': {
                'title': 'Note',
                'self_driving': 'Full Self-Driving requires Enhanced Autopilot',
                'price': 'Tentative price, not officially released by Tesla',
                'performance': 'Performance requires all wheel drive'
            }
        },
        'es_ES': {
            'thou_sep': '.',
            'yes': 'Sí',
            'no': 'No',
            'title': 'Calculadora del Tesla Model 3',
            'h1': 'Configura tu Tesla Model 3',
            'included': 'Incluido',
            'wheels': {
                aero: 'Aero',
                sport: 'Sport',
            },
            'paint': {
                black: 'Negro sólido',
                blue: 'Azul oscuro metálico',
                red: 'Rojo multi-capa',
                // silver: 'Plateado metálico',
                midnight: 'Plateado metálico medianoche',
                white: 'Blanco perlado multi-capa',
                // obsidian: 'Negro obsidiana metálico'
            },
            'battery': {
                standard: 'Estándar (354 km)',
                mid: 'Alcance medio (418 km)',
                long: 'Largo alcance (544 km)'
            },
            'data': {
                'color': 'Color',
                'wheels': 'Ruedas',
                'premium': 'Mejoras premium',
                'white_interior': 'Interior blanco',
                'battery': 'Batería',
                'autopilot': 'Piloto automático mejorado',
                // 'self_driving': 'Conducción autónoma',
                'dual': 'Tracción integral',
                'performance': 'Máximo rendimiento',
                'performance_upgrade': 'Mejoras para máximo rendimiento',
            },
            'form': {
                'dest_doc': 'Tasa de destinación y documentación',
                'import': 'Tasas de importación',
                'total_no_vat': 'Total (sin IVA)',
                'vat': 'IVA',
                'incentive': 'Ayudas directas',
                'total_vat': "Total"
            },
            'notes': {
                'title': 'Nota',
                'self_driving': 'La conducción autónoma require el piloto automático mejorado',
                'price': 'Precio tentativo, no publicado por Tesla',
                'performance': 'El modo máximo rendimiento requiere tracción integral'
            }
        }
    };

    var number_format = function (x, t) {
        return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, t);
    };
    var currency_format = function (amount) {
        return (currency == usd ? '$' : '') +
            number_format(amount, lang[current_lang].thou_sep) +
            (currency == 'eur' ? '€' : '');
    };

    var add_class = 'add';
    var remove_class = 'remove';
    var selected_class = 'selected';

    $('.color .button').click(function () {
        if ($(this).hasClass(black)) {
            color = black;
        } else if ($(this).hasClass(blue)) {
            color = blue;
        } else if ($(this).hasClass(red)) {
            color = red;
            // } else if ($(this).hasClass(silver)) {
            //     color = silver;
        } else if ($(this).hasClass(midnight)) {
            color = midnight;
        } else if ($(this).hasClass(white)) {
            color = white;
            // } else if ($(this).hasClass(obsidian)) {
            //     color = obsidian;
        }
        update_image();
        $('.color .button.selected').removeClass(selected_class);
        $(this).addClass(selected_class);
        update_data();
        update_total();
    });

    var performance_upgrade_modify_selector = ".data .performance_upgrade .modify";
    $('.wheels .button').click(function () {
        if ($(this).hasClass(aero)) {
            wheels = aero;

            if (performance_upgrade) {
                $(performance_upgrade_modify_selector).click();
            }
        } else if ($(this).hasClass(sport)) {
            wheels = sport;

            if (performance && !performance_upgrade) {
                $(performance_upgrade_modify_selector).click();
            }
        }
        update_image();
        $('.wheels .button.selected').removeClass(selected_class);
        $(this).addClass(selected_class);
        update_data();
        update_total();
    });

    var white_interior_modify_selector = '.data .white_interior .modify';
    $('.data .premium .modify').click(function () {
        if (premium) {
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);
        } else {
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        }
        premium = !premium;
        update_data();
        update_total();
    });

    var performance_modify_selector = '.data .performance .modify';
    $(white_interior_modify_selector).click(function () {
        if (white_interior) {
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);
        } else {
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);

            if (!performance) {
                $(performance_modify_selector).click();
            }
        }
        white_interior = !white_interior;
        update_data();
        update_total();
    });

    var battery_modify_selector = '.data .battery .modify';
    $(battery_modify_selector).click(function () {
        if (battery === standard) {
            battery = long;
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        } else {
            battery = standard;
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            if (performance) {
                $(performance_modify_selector).click();
            }
        }
        update_data();
        update_total();
    });

    var autopilot_modify_selector = '.data .autopilot .modify';
    // var self_driving_modify_selector = '.data .self_driving .modify';
    $(autopilot_modify_selector).click(function () {
        if (autopilot) {
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            // if (self_driving) {
            //     $(self_driving_modify_selector).click();
            // }
        } else {
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        }
        autopilot = !autopilot;
        update_data();
        update_total();
    });

    // $(self_driving_modify_selector).click(function () {
    //     if (!self_driving) {
    //         $(this).removeClass(add_class);
    //         $(this).addClass(remove_class);

    //         if (!autopilot) {
    //             $(autopilot_modify_selector).click();
    //         }
    //     } else {
    //         $(this).removeClass(remove_class);
    //         $(this).addClass(add_class);
    //     }
    //     self_driving = !self_driving;
    //     update_data();
    //     update_total();
    // });

    var dual_modify_selector = '.data .dual .modify';
    $(dual_modify_selector).click(function () {
        if (dual) {
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            if (performance) {
                $(performance_modify_selector).click();
            }
        } else {
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        }
        dual = !dual;
        update_data();
        update_total();
    });

    $(performance_modify_selector).click(function () {
        if (performance) {
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            if (white_interior) {
                $(white_interior_modify_selector).click();
            }
            if (performance_upgrade) {
                $(performance_upgrade_modify_selector).click();
            }
        } else {
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);

            if (!dual) {
                $(dual_modify_selector).click();
            }
            if (battery === standard) {
                $(battery_modify_selector).click();
            }
        }
        performance = !performance;
        update_data();
        update_total();
    });

    $(performance_upgrade_modify_selector).click(function () {
        if (performance_upgrade) {
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);
            performance_upgrade = false;

            if (wheels === sport) {
                $('.wheels .button.aero').click();
            }
        } else {
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
            performance_upgrade = true;

            if (wheels === aero) {
                $('.wheels .button.sport').click();
            }

            if (!performance) {
                $(performance_modify_selector).click();
            }
        }

        update_data();
        update_total();
    });

    // Currency and language change:
    var currency_selector = 'nav.currency';
    var open_class = 'open';
    $('nav.currency li').click(function () {
        if ($(currency_selector).hasClass(open_class)) {
            $(this).addClass(selected_class);
            $(currency_selector).removeClass(open_class);
            currency = $(this).data('currency');

            update_currency();
            update_data();
            update_total();
        } else {
            $(currency_selector).addClass(open_class);
            $(this).removeClass(selected_class);
        }
    });

    var lang_selector = 'nav.lang';
    $('nav.lang li').click(function () {
        if ($(lang_selector).hasClass(open_class)) {
            $(this).addClass(selected_class);
            $(lang_selector).removeClass(open_class);
            current_lang = $(this).data('lang');

            update_currency();
            update_language();
            update_data();
            update_total();
        } else {
            $(lang_selector).addClass(open_class);
            $(this).removeClass(selected_class);
        }
    });

    $('#import').change(function () {
        import_tax = 1 + $(this).val() / 100;
        update_total();
    });

    $('#vat').change(function () {
        vat = 1 + $(this).val() / 100;
        update_total();
    });

    $('#incentive').change(function () {
        incentive = $(this).val();
        update_total();
    });

    var update_currency = function () {
        var color_price = color === black ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].paint[color]) + (currency === usd ? '' : '**');
        $('.data .color .price').text(color_price);

        var wheels_price = wheels === aero ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].wheels[wheels]) + (currency === usd ? '' : '**');
        $('.data .wheels .price').text(wheels_price);

        $('.data .premium .price').text('+' + currency_format(prices[currency].premium) + (currency === usd ? '' : '**'));
        $('.data .white_interior .price').text('+' + currency_format(prices[currency].white_interior));

        var battery_price = battery === standard ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].battery[battery]) + (currency === usd ? '' : '**');
        $('.data .battery .price').text(battery_price);

        $('.data .autopilot .price').text('+' + currency_format(prices[currency].autopilot) + (currency === usd ? '' : '**'));
        $('.data .self_driving .price').text('+' + currency_format(prices[currency].self_driving) + (currency === usd ? '' : '**'));
        $('.data .dual .price').text('+' + currency_format(prices[currency].premium));
        $('.data .performance .price').text('+' + currency_format(prices[currency].performance));
        $('.data .performance_upgrade .price').text('+' + currency_format(prices[currency].performance_upgrade));

        if (currency == 'eur') {
            $('.currency_symbol.before').hide();
            $('.currency_symbol.after').show();
        } else if (currency == 'usd') {
            $('.currency_symbol.after').hide();
            $('.currency_symbol.before').show();
        }

        $('.price .dest_doc .price').text(currency_format(prices[currency].dest_doc))
    };
    var update_language = function () {
        $('title').text(lang[current_lang].title);
        $('h1').text(lang[current_lang].h1);

        // Data section
        $('.color .title').text(lang[current_lang].data.color);
        $('.wheels .title').text(lang[current_lang].data.wheels);
        $('.premium .title').text(lang[current_lang].data.premium);
        $('.white_interior .title').text(lang[current_lang].data.white_interior);
        $('.battery .title').text(lang[current_lang].data.battery);
        $('.autopilot .title').text(lang[current_lang].data.autopilot);
        // $('.self_driving .title').text(lang[current_lang].data.self_driving);
        $('.dual .title').text(lang[current_lang].data.dual);
        $('.performance .title').text(lang[current_lang].data.performance);
        $('.performance_upgrade .title').text(lang[current_lang].data.performance_upgrade);

        // Form
        $('.dest_doc .title').text(lang[current_lang].form.dest_doc);
        $('label[for="import"]').text(lang[current_lang].form.import);
        $('.total-no-vat .title').text(lang[current_lang].form.total_no_vat);
        $('label[for="vat"]').text(lang[current_lang].form.vat);
        $('label[for="incentive"]').text(lang[current_lang].form.incentive);
        $('.total-vat .title').text(lang[current_lang].form.total_vat);

        // Notes
        $('.note .title').text(lang[current_lang].notes.title);
        $('.note.self-driving .text').text(lang[current_lang].notes.self_driving);
        $('.note.price .text').text(lang[current_lang].notes.price);
        $('.note.performance .text').text(lang[current_lang].notes.performance);
    };

    var update_image = function () {
        $('img.car').attr('src', 'img/' + color + '_' + wheels + '.png');
    };
    var update_data = function () {
        $('.data .color .text').text(lang[current_lang].paint[color]);
        var color_price = color == black ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].paint[color]) + (currency == usd ? '' : '**');
        $('.data .color .price').text(color_price);

        var wheels_price = wheels == aero ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].wheels[wheels]) + (currency == usd ? '' : '**');
        $('.data .wheels .price').text(wheels_price);
        $('.data .wheels .text').text(lang[current_lang].wheels[wheels]);

        var premium_text = premium ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .premium .text').text(premium_text);

        var white_interior_text = white_interior ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .white_interior .text').text(white_interior_text);

        var battery_text = lang[current_lang].battery[battery];
        $('.data .battery .text').text(battery_text);

        var autopilot_text = autopilot ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .autopilot .text').text(autopilot_text);

        // var self_driving_text = self_driving ? lang[current_lang].yes : lang[current_lang].no;
        // $('.data .self_driving .text').text(self_driving_text);

        var dual_text = dual ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .dual .text').text(dual_text);

        var performance_text = performance ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .performance .text').text(performance_text);

        var performance_upgrade_text = performance_upgrade ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .performance_upgrade .text').text(performance_upgrade_text);
    };

    var update_total = function () {
        var price = prices[currency].base;
        if (premium) {
            price += prices[currency].premium;
        }
        if (white_interior) {
            price += prices[currency].white_interior;
        }
        if (autopilot) {
            price += prices[currency].autopilot;
        }
        // if (self_driving) {
        //     price += prices[currency].self_driving;
        // }
        if (dual) {
            price += prices[currency].dual;
        }
        if (performance) {
            price += prices[currency].performance;
        }
        if (performance_upgrade) {
            price += prices[currency].performance_upgrade;
        }
        if (!performance_upgrade) {
            price += prices[currency].wheels[wheels];
        }

        price += prices[currency].paint[color];
        price += prices[currency].battery[battery];

        price += prices[currency].dest_doc;

        var import_price = price * (import_tax - 1);
        $('.price .import span').text(currency_format(import_price));

        price = price + import_price;

        $('.price h3.total-no-vat span.price').text(currency_format(price));

        var vat_price = price * (vat - 1);
        $('.price .vat span.price').text(currency_format(vat_price));
        var total_price = price * vat - incentive;
        $('.price h2 span.price').text(currency_format(total_price));
    };

    var setupValue = function (key, value) {
        key = key.trim();
        value = value.trim();
        switch (key) {
            case "currency":
                if (typeof prices[value] !== 'undefined') {
                    currency = value;
                }
                break;
            case "current_lang":
                if (typeof lang[value] !== 'undefined') {
                    current_lang = value;
                }
                break;
            case "import_tax":
                value = Number.parseFloat(value);
                if (value >= 0) {
                    import_tax = value;
                }
                break;
            case "vat":
                value = Number.parseFloat(value);
                if (value >= 0) {
                    vat = value;
                }
                break;
            case "incentive":
                value = Number.parseFloat(value);
                if (value >= 0) {
                    incentive = value;
                }
                break;
            case "color":
                if (typeof prices[current_lang].paint[value] !== 'undefined') {
                    color = value;
                }
                break;
            case "wheels":
                if (typeof prices[current_lang].wheels[value] !== 'undefined') {
                    wheels = value;
                }
                break;
            case "premium":
                // TODO parse boolean
                break;
            case "white_interior":
                // TODO parse boolean
                break;
            case "battery":
                if (typeof prices[current_lang].battery[value] !== 'undefined') {
                    color = value;
                }
                break;
            case "autopilot":
                // TODO parse boolean
                break;
            case "self_driving":
                // TODO parse boolean
                break;
            case "dual":
                // TODO parse boolean
                break;
            case "performance":
                // TODO parse boolean
                break;
        }
    };

    // Check if any parameters were provided and update UI.
    var queryString = document.documentURI.split('?')
    if (typeof queryString[1] !== 'undefined') {
        queryString = queryString[1].split('&');

        for (i in queryString) {
            var queryParam = queryString[i].split('=');
            setupValue(queryParam[0], queryParam[1]);
        }

        update_image();
        update_currency();
        update_language();
        update_data();
        update_total();
    }
});
