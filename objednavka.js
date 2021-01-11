$(document).ready(function () {
    var zakladniCena = 0;
    var prirazka = 1;
    var navyseni = 0;
    var cenaDopravy = 0;
    var zaDopravuIndex = 1;
    var cena = 0;
    var pocet = $("#pocet_kg").val();

    $("#cena_za_krmivo").prop("readonly", true);
    $("#cena_celkem").prop("readonly", true);

    $("#vyber_krmiva").change(function () {
        cena = $("option:selected", this).attr("value");
        zakladniCena = cena * pocet;
        $("#cena_za_krmivo").val(zakladniCena);

        /* (nakonec není potřeba, ale je škoda to smazat, jelikož to hezky funguje :D)
        var pole = [];
        $(".vlastnosti_procentni:checked").each (function () {
            pole.push($(this).attr("value"));
        });
        console.log(pole);
        prirazka = 1;
        for (let i = 0; i < pole.length; i++) {
            prirazka += parseFloat(pole[i]);
        }
        console.log("přirážka: " + prirazka);
        */
       
        $("#cena_celkem").val(Math.round((zakladniCena * prirazka + navyseni) * zaDopravuIndex + cenaDopravy));
    });

    $("#pocet_kg").keyup(function () { 
        if (this.value == "") {
            pocet = 0;
        }
        else {
            pocet = parseFloat(this.value); 
        }
        zakladniCena = cena * pocet;
        $("#cena_za_krmivo").val(cena * pocet);
        $("#cena_celkem").val(Math.round((zakladniCena * prirazka + navyseni) * zaDopravuIndex + cenaDopravy));
    });

    $("#bio, #premium, #economy").click (function () {
        if (this.checked) {
            prirazka += parseFloat(this.value);
            //console.log(prirazka);
        }
        else {
            prirazka -= parseFloat(this.value);
            //console.log(prirazka);
        }
        $("#cena_celkem").val(Math.round((zakladniCena * prirazka + navyseni) * zaDopravuIndex + cenaDopravy));
    });

    $("#darkove").click (function () {
        if (this.checked) {
            navyseni += parseInt(this.value);
            //console.log(navyseni);
        }
        else {
            navyseni -= parseInt(this.value);
            //console.log(navyseni);
        }
        $("#cena_celkem").val(Math.round((zakladniCena * prirazka + navyseni) * zaDopravuIndex + cenaDopravy));
    });

    $("#doprava_osobni, #doprava_posta").click (function () {
        if (this.checked) {
            zaDopravuIndex = 1;
            cenaDopravy = parseInt(this.value);
            //console.log(cenaDopravy);
        }
        $("#cena_celkem").val(Math.round((zakladniCena * prirazka + navyseni) * zaDopravuIndex + cenaDopravy));
    });

    $("#doprava_kuryr").click (function () {
        if (this.checked) {
            cenaDopravy = 0;
            zaDopravuIndex = 1 + parseFloat(this.value);
            //console.log("index za dopravu:" + zaDopravuIndex);
        }
        $("#cena_celkem").val(Math.round((zakladniCena * prirazka + navyseni) * zaDopravuIndex + cenaDopravy));
    });

    $("#kontrola").click(function () { 
        var castka = $("#k_utraceni").val();
        var celkem = $("#cena_celkem").val();
        if (castka == "") {
            $("#vyhodnoceniKontroly").text("Zadejte částku k utracení.");
        }
        else if (celkem == "") {
            $("#vyhodnoceniKontroly").text("Vyberte zboží.");
        }
        else if (parseInt(castka) <= parseInt(celkem)) {
            $("#vyhodnoceniKontroly").text("To nestačí, musíte rozbít prasátko.");
        }
        else if (parseInt(castka) > parseInt(celkem)) {
            $("#vyhodnoceniKontroly").text("OK, můžete nakoupit.");  
        } 
    });

    $("#email").keyup(function () { 
        var regex = /^[a-zA-Z0-9.]+$/;
        var platny = regex.test($("#email").val());
        if (!platny) {
            $("#email_kontrola").text("e-mail smí obsahovat pouze číslice, písmena bez diakritiky a tečku");
        }
        else {
            $("#email_kontrola").text("");
        }
    });        
});

