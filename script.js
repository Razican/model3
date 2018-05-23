$(function () {
    var currency = 'usd';
    var current_lang = 'en_US';

    var import_tax = 1;
    var vat = 1;
    var incentive = 0;

    var color = 'black';
    var wheels = 'aero';
    var premium = true;
    var battery = 'long';
    var autopilot = false;
    var self_driving = false;
    var dual = false;
    var performance = false;

    var usd_to_eur = 0.85448;
    var change_margin = 1.03;

    var prices = {
        'usd': {
            'base': 35000,
            'wheels': {
                'aero': 0,
                'sport': 1500,
            },
            'paint': {
                'black': 0,
                'blue': 1000,
                'red': 1000,
                'silver': 1000,
                'midnight': 1000,
                'white': 1000
            },
            'battery': {
                'standard': 0,
                'long': 9000
            },
            'premium': 5000,
            'autopilot': 5000,
            'self_driving': 3000,
            'dual': 5000,
            'performance': 23000
        },
        'eur': {
            'base': Math.round(35000 * usd_to_eur * change_margin),
            'wheels': {
                'aero': 0,
                'sport': Math.round(1500 * usd_to_eur * change_margin),
            },
            'paint': {
                'black': 0,
                'blue': Math.round(1000 * usd_to_eur * change_margin),
                'red': Math.round(1000 * usd_to_eur * change_margin),
                'silver': Math.round(1000 * usd_to_eur * change_margin),
                'midnight': Math.round(1000 * usd_to_eur * change_margin),
                'white': Math.round(1000 * usd_to_eur * change_margin)
            },
            'battery': {
                'standard': 0,
                'long': Math.round(9000 * usd_to_eur * change_margin)
            },
            'premium': Math.round(5000 * usd_to_eur * change_margin),
            'autopilot': Math.round(5000 * usd_to_eur * change_margin),
            'self_driving': Math.round(3000 * usd_to_eur * change_margin),
            'dual': Math.round(5000 * usd_to_eur * change_margin),
            'performance': Math.round(23000 * usd_to_eur * change_margin)
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
                'aero': 'Aero',
                'sport': 'Sport',
            },
            'paint': {
                'black': 'Solid Black',
                'blue': 'Deep Blue Metallic',
                'red': 'Red Multi-Coat',
                'silver': 'Silver Metallic',
                'midnight': 'Midnight Silver Metallic',
                'white': 'Pearl White Multi-Coat'
            },
            'battery': {
                'standard': 'Standard (220 miles)',
                'long': 'Long Range (310 miles)'
            },
            'data': {
                'color': 'Color',
                'wheels': 'Wheels',
                'premium': 'Premium Upgrades',
                'battery': 'Battery',
                'autopilot': 'Enhanced Autopilot',
                'self_driving': 'Full Self-Driving',
                'dual': 'Dual Motors',
                'performance': 'Max Performance'
            },
            'form': {
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
                'performance': 'Performance mode requires dual motors'
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
                'aero': 'Aero',
                'sport': 'Sport',
            },
            'paint': {
                'black': 'Negro sólido',
                'blue': 'Azul oscuro metálico',
                'red': 'Red Multi-Coat',
                'silver': 'Plateado metálico',
                'midnight': 'Plateado metálico medianoche',
                'white': 'Pearl White Multi-Coat'
            },
            'battery': {
                'standard': 'Estándar (354 km)',
                'long': 'Largo alcance (499 km)'
            },
            'data': {
                'color': 'Color',
                'wheels': 'Ruedas',
                'premium': 'Mejoras premium',
                'battery': 'Batería',
                'autopilot': 'Piloto automático mejorado',
                'self_driving': 'Conducción autónoma',
                'dual': 'Tracción integral',
                'performance': 'Máximo rendimiento'
            },
            'form': {
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
        return (currency == 'usd' ? '$' : '') +
            number_format(amount, lang[current_lang].thou_sep) +
            (currency == 'eur' ? '€' : '');
    };

    var add_class = 'add';
    var remove_class = 'remove';
    var selected_class = 'selected';

    $('.color .button').click(function () {
        if ($(this).hasClass('black')) {
            color = 'black';
        } else if ($(this).hasClass('blue')) {
            color = 'blue';
        } else if ($(this).hasClass('red')) {
            color = 'red';
        } else if ($(this).hasClass('silver')) {
            color = 'silver';
        } else if ($(this).hasClass('midnight')) {
            color = 'midnight';
        } else if ($(this).hasClass('white')) {
            color = 'white';
        }
        update_image();
        $('.color .button.selected').removeClass(selected_class);
        $(this).addClass(selected_class);
        update_data();
        update_total();
    });
    $('.wheels .button').click(function () {
        if ($(this).hasClass('aero')) {
            wheels = 'aero';
        } else if ($(this).hasClass('sport')) {
            wheels = 'sport';
        }
        update_image();
        $('.wheels .button.selected').removeClass(selected_class);
        $(this).addClass(selected_class);
        update_data();
        update_total();
    });
    $('.data .premium .modify').click(function () {
        if ($(this).hasClass(add_class)) {
            premium = true;
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        } else {
            premium = false;
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);
        }
        update_data();
        update_total();
    });
    var performance_modify_selector = '.data .performance .modify';
    var battery_modify_selector = '.data .battery .modify';
    $(battery_modify_selector).click(function () {
        if ($(this).hasClass(add_class)) {
            battery = 'long';
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        } else {
            battery = 'standard';
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            if (performance) {
                performance = false;
                $(performance_modify_selector).removeClass(remove_class);
                $(performance_modify_selector).addClass(add_class);
            }
        }
        update_data();
        update_total();
    });
    var autopilot_modify_selector = '.data .autopilot .modify';
    var self_driving_modify_selector = '.data .self_driving .modify';
    $(autopilot_modify_selector).click(function () {
        if ($(this).hasClass(add_class)) {
            autopilot = true;
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        } else {
            autopilot = false;
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            if (self_driving) {
                self_driving = false;
                $(self_driving_modify_selector).removeClass(remove_class);
                $(self_driving_modify_selector).addClass(add_class);
            }
        }
        update_data();
        update_total();
    });
    $(self_driving_modify_selector).click(function () {
        if ($(this).hasClass(add_class)) {
            self_driving = true;
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);

            if (!autopilot) {
                autopilot = true;
                $(autopilot_modify_selector).removeClass(add_class);
                $(autopilot_modify_selector).addClass(remove_class);
            }
        } else {
            self_driving = false;
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);
        }
        update_data();
        update_total();
    });
    var dual_modify_selector = '.data .dual .modify';
    $(dual_modify_selector).click(function () {
        if ($(this).hasClass(add_class)) {
            dual = true;
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);
        } else {
            dual = false;
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);

            if (performance) {
                performance = false;
                $(performance_modify_selector).removeClass(remove_class);
                $(performance_modify_selector).addClass(add_class);
            }
        }
        update_data();
        update_total();
    });
    $(performance_modify_selector).click(function () {
        if ($(this).hasClass(add_class)) {
            performance = true;
            $(this).removeClass(add_class);
            $(this).addClass(remove_class);

            if (!dual) {
                dual = true;
                $(dual_modify_selector).removeClass(add_class);
                $(dual_modify_selector).addClass(remove_class);
            }
            if (battery === 'standard') {
                battery = 'long';
                $(battery_modify_selector).removeClass(add_class);
                $(battery_modify_selector).addClass(remove_class);
            }
        } else {
            performance = false;
            $(this).removeClass(remove_class);
            $(this).addClass(add_class);
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
        var color_price = color == 'black' ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].paint[color]) + (currency == 'usd' ? '' : '**');
        $('.data .color .price').text(color_price);

        var wheels_price = wheels == 'aero' ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].wheels[wheels]) + (currency == 'usd' ? '' : '**');
        $('.data .wheels .price').text(wheels_price);

        $('.data .premium .price').text('+' + currency_format(prices[currency].premium) + (currency == 'usd' ? '' : '**'));

        var battery_price = battery == 'standard' ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].battery[battery]) + (currency == 'usd' ? '' : '**');
        $('.data .battery .price').text(battery_price);

        $('.data .autopilot .price').text('+' + currency_format(prices[currency].autopilot) + (currency == 'usd' ? '' : '**'));
        $('.data .self_driving .price').text('+' + currency_format(prices[currency].self_driving) + (currency == 'usd' ? '' : '**'));
        $('.data .dual .price').text('+' + currency_format(prices[currency].premium));
        $('.data .performance .price').text('+' + currency_format(prices[currency].performance));

        if (currency == 'eur') {
            $('.currency_symbol.before').hide();
            $('.currency_symbol.after').show();
        } else if (currency == 'usd') {
            $('.currency_symbol.after').hide();
            $('.currency_symbol.before').show();
        }
    };
    var update_language = function () {
        $('title').text(lang[current_lang].title);
        $('h1').text(lang[current_lang].h1);

        // Data section
        $('.color .title').text(lang[current_lang].data.color);
        $('.wheels .title').text(lang[current_lang].data.wheels);
        $('.premium .title').text(lang[current_lang].data.premium);
        $('.battery .title').text(lang[current_lang].data.battery);
        $('.autopilot .title').text(lang[current_lang].data.autopilot);
        $('.self_driving .title').text(lang[current_lang].data.self_driving);
        $('.dual .title').text(lang[current_lang].data.dual);
        $('.performance .title').text(lang[current_lang].data.performance);

        // Form
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
        var color_price = color == 'black' ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].paint[color]) + (currency == 'usd' ? '' : '**');
        $('.data .color .price').text(color_price);

        var wheels_price = wheels == 'aero' ?
            lang[current_lang].included :
            '+' + currency_format(prices[currency].wheels[wheels]) + (currency == 'usd' ? '' : '**');
        $('.data .wheels .price').text(wheels_price);
        $('.data .wheels .text').text(lang[current_lang].wheels[wheels]);

        var premium_text = premium ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .premium .text').text(premium_text);

        var battery_text = lang[current_lang].battery[battery];
        $('.data .battery .text').text(battery_text);

        var autopilot_text = autopilot ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .autopilot .text').text(autopilot_text);

        var self_driving_text = self_driving ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .self_driving .text').text(self_driving_text);

        var dual_text = dual ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .dual .text').text(dual_text);

        var performance_text = performance ? lang[current_lang].yes : lang[current_lang].no;
        $('.data .performance .text').text(performance_text);
    };

    var update_total = function () {
        var price = prices[currency].base;
        if (premium) {
            price += prices[currency].premium;
        }
        if (autopilot) {
            price += prices[currency].autopilot;
        }
        if (self_driving) {
            price += prices[currency].self_driving;
        }
        if (dual) {
            price += prices[currency].dual;
        }
        if (performance) {
            price += prices[currency].performance;
        }
        price += prices[currency].wheels[wheels];
        price += prices[currency].paint[color];
        price += prices[currency].battery[battery];

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
