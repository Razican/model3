$(function() {
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

    var usd_to_eur = 0.842964;
    var change_margin = 1.025;

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
            'dual': 4500,
            'performance': 15000
        },
        'eur': {
            'base': Math.round(35000*usd_to_eur*change_margin),
            'wheels': {
                'aero': 0,
                'sport': Math.round(1500*usd_to_eur*change_margin),
            },
            'paint': {
                'black': 0,
                'blue': Math.round(1000*usd_to_eur*change_margin),
                'red': Math.round(1000*usd_to_eur*change_margin),
                'silver': Math.round(1000*usd_to_eur*change_margin),
                'midnight': Math.round(1000*usd_to_eur*change_margin),
                'white': Math.round(1000*usd_to_eur*change_margin)
            },
            'battery': {
                'standard': 0,
                'long': Math.round(9000*usd_to_eur*change_margin)
            },
            'premium': Math.round(5000*usd_to_eur*change_margin),
            'autopilot': Math.round(5000*usd_to_eur*change_margin),
            'self_driving': Math.round(3000*usd_to_eur*change_margin),
            'dual': Math.round(4500*usd_to_eur*change_margin),
            'performance': Math.round(15000*usd_to_eur*change_margin)
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
                'standard': 'Standard',
                'long': 'Long Range'
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
                'standard': 'Estándar',
                'long': 'Largo alcance'
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

    var number_format = function(x, t) {
        return x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, t);
    };
    var currency_format = function(amount) {
        return (currency == 'usd' ? '$' : '') +
                number_format(amount, lang[current_lang].thou_sep) +
                (currency == 'eur' ? '€' : '');
    };

    $('.color .button').click(function() {
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
        $('.color .button.selected').removeClass('selected');
        $(this).addClass('selected');
        update_data();
        update_total();
    });
    $('.wheels .button').click(function() {
        if ($(this).hasClass('aero')) {
            wheels = 'aero';
        } else if ($(this).hasClass('sport')) {
            wheels = 'sport';
        }
        update_image();
        $('.wheels .button.selected').removeClass('selected');
        $(this).addClass('selected');
        update_data();
        update_total();
    });
    $('.data .premium .modify').click(function() {
        if ($(this).hasClass('add')) {
            premium = true;
            $(this).removeClass('add');
            $(this).addClass('remove');
        } else {
            premium = false;
            $(this).removeClass('remove');
            $(this).addClass('add');
        }
        update_data();
        update_total();
    });
    $('.data .battery .modify').click(function() {
        if ($(this).hasClass('add')) {
            battery = 'long';
            $(this).removeClass('add');
            $(this).addClass('remove');
        } else {
            battery = 'standard';
            $(this).removeClass('remove');
            $(this).addClass('add');
        }
        update_data();
        update_total();
    });
    var autopilot_modify_selector = '.data .autopilot .modify';
    var self_driving_modify_selector = '.data .self_driving .modify';
    $(autopilot_modify_selector).click(function() {
        if ($(this).hasClass('add')) {
            autopilot = true;
            $(this).removeClass('add');
            $(this).addClass('remove');
        } else {
            autopilot = false;
            $(this).removeClass('remove');
            $(this).addClass('add');

            if (self_driving) {
                self_driving = false;
                $(self_driving_modify_selector).removeClass('remove');
                $(self_driving_modify_selector).addClass('add');
            }
        }
        update_data();
        update_total();
    });
    $(self_driving_modify_selector).click(function() {
        if ($(this).hasClass('add')) {
            self_driving = true;
            $(this).removeClass('add');
            $(this).addClass('remove');

            if (!autopilot) {
                autopilot = true;
                $(autopilot_modify_selector).removeClass('add');
                $(autopilot_modify_selector).addClass('remove');
            }
        } else {
            self_driving = false;
            $(this).removeClass('remove');
            $(this).addClass('add');
        }
        update_data();
        update_total();
    });
    var dual_modify_selector = '.data .dual .modify';
    var performance_modify_selector = '.data .performance .modify';
    $(dual_modify_selector).click(function() {
        if ($(this).hasClass('add')) {
            dual = true;
            $(this).removeClass('add');
            $(this).addClass('remove');
        } else {
            dual = false;
            $(this).removeClass('remove');
            $(this).addClass('add');

            if (performance) {
                performance = false;
                $(performance_modify_selector).removeClass('remove');
                $(performance_modify_selector).addClass('add');
            }
        }
        update_data();
        update_total();
    });
    $(performance_modify_selector).click(function() {
        if ($(this).hasClass('add')) {
            performance = true;
            $(this).removeClass('add');
            $(this).addClass('remove');

            if (!dual) {
                dual = true;
                $(dual_modify_selector).removeClass('add');
                $(dual_modify_selector).addClass('remove');
            }
        } else {
            performance = false;
            $(this).removeClass('remove');
            $(this).addClass('add');
        }
        update_data();
        update_total();
    });
    // Currency and language change:
    var currency_selector = 'nav.currency';
    $('nav.currency li').click(function() {
        if ($(currency_selector).hasClass('open')) {
            $(this).addClass('selected');
            $(currency_selector).removeClass('open');
            currency = $(this).data('currency');

            update_currency();
            update_data();
            update_total();
        } else {
            $(currency_selector).addClass('open');
            $(this).removeClass('selected');
        }
    });
    var lang_selector = 'nav.lang';
    $('nav.lang li').click(function() {
        if ($(lang_selector).hasClass('open')) {
            $(this).addClass('selected');
            $(lang_selector).removeClass('open');
            current_lang = $(this).data('lang');

            update_currency();
            update_language();
            update_data();
            update_total();
        } else {
            $(lang_selector).addClass('open');
            $(this).removeClass('selected');
        }
    });

    $('#import').change(function() {
        import_tax = 1 + $(this).val()/100;
        update_total();
    });
    $('#vat').change(function() {
        vat = 1 + $(this).val()/100;
        update_total();
    });
    $('#incentive').change(function() {
        incentive = $(this).val();
        update_total();
    });

    var update_currency = function() {
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
    var update_language = function() {
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

    var update_image = function() {
        $('img.car').attr('src', 'img/' + color + '_' + wheels + '.png');
    };
    var update_data = function() {
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

    var update_total = function() {
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

        var import_price = price * (import_tax-1);
        $('.price .import span').text(currency_format(import_price));

        price = price + import_price;

        $('.price h3.total-no-vat span.price').text(currency_format(price));

        var vat_price = price * (vat-1);
        $('.price .vat span.price').text(currency_format(vat_price));
        var total_price = price * vat - incentive;
        $('.price h2 span.price').text(currency_format(total_price));
    };
});
