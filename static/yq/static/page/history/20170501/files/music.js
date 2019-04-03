
function PlaySound() {
    $("#jquery_jplayer_1").jPlayer('play').jPlayer("repeat");
    $("#jp_container_1").show();
}

function audio() {

    new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, [
        {
            title:"<div class='item-song'>看淡</div><div class='item-artist'></div>",
            itunes :"#",
            amazon : "#",
            buy : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/hebe/m1.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>To Hebe</span></div><div class='item-artist'></div>",
            buy : "",
            download : "#",
            mp3:"https://dn-qiniucdn.qbox.me/hebe/m2.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>魔鬼中的天使</span></div><div class='item-artist'></div>",
            buy : "#",
            itunes :"",
            amazon : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/hebe/m3.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>小幸运</span></div><div class='item-artist'></div>",
            buy : "#",
            itunes :"",
            amazon : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/hebe/m4.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>你太猖狂</div><div class='item-artist'></div>",
            itunes :"#",
            amazon : "#",
            buy : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/hebe/m5.mp3",
            oga:""
        }
    ], {
        swfPath: "js",
        supplied: "oga, mp3",
        wmode: "window",
        smoothPlayBar: false,
        keyEnabled: false
    });
}
