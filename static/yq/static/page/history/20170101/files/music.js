
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
            title:"<div class='item-song'>醜八怪</div><div class='item-artist'>薛之谦</div>",
            itunes :"#",
            amazon : "#",
            buy : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/star/a2.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>你还要我怎样</span></div><div class='item-artist'>薛之谦</div>",
            buy : "",
            download : "#",
            mp3:"https://dn-qiniucdn.qbox.me/star/a1.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>手掌心</span></div><div class='item-artist'>丁噹</div>",
            buy : "#",
            itunes :"",
            amazon : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/star/b1.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>拯救</span></div><div class='item-artist'>丁噹</div>",
            buy : "#",
            itunes :"",
            amazon : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/star/b2.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>浮誇</div><div class='item-artist'>梁君諾</div>",
            itunes :"#",
            amazon : "#",
            buy : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/star/c1.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>心虚</span></div><div class='item-artist'>梁君諾</div>",
            buy : "",
            download : "#",
            mp3:"https://dn-qiniucdn.qbox.me/star/c2.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>我是一只小小烏</span></div><div class='item-artist'>趙露</div>",
            buy : "#",
            itunes :"",
            amazon : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/star/d1.mp3",
            oga:""
        },
        {
            title:"<div class='item-song'>放過我</span></div><div class='item-artist'>趙露</div>",
            buy : "#",
            itunes :"",
            amazon : "",
            download : "",
            mp3:"https://dn-qiniucdn.qbox.me/star/d2.mp3",
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
