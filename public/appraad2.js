var myroom = null;
var ncolors = [];
var bcc = 0x0;
var replyId = null;
var rcach = {};
var mic = [];
var myid = null;
var user_pic = null;
var room_pic = null;
(() => {
  var _0x1d2a23 = window.AudioContext || window.webkitAudioContext;
  function _0x3185fa(_0x4fcb66, _0x270eb4, _0x2e92c2) {
    try {
      if (_0x428768) {
        _0x264ac2(["getting Media", navigator.getUserMedia == null, navigator.webkitGetUserMedia == null, navigator.mozGetUserMedia == null, navigator.mediaDevices == null]);
      }
      var _0x5929da = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (_0x5929da != null) {
        _0x5929da.call(navigator, _0x4fcb66, _0x270eb4 || function () {}, _0x2e92c2 || function () {});
      } else {
        if (navigator.mediaDevices != null && navigator.mediaDevices.getUserMedia != null) {
          return navigator.mediaDevices.getUserMedia(_0x4fcb66).then(_0x270eb4)["catch"](_0x2e92c2 || function () {});
        }
      }
    } catch (_0x3f812c) {
      if (_0x428768) {
        _0x264ac2(["getmedia", _0x3f812c.message, _0x3f812c.stack]);
      }
    }
  }
  function _0x264ac2(_0x4577b5) {
    $("#d2").append(_0x4577b5.join("<br>--") + "<br>");
  }
  var _0x428768 = false;
  var _0x4150cb = false;
  var _0x1b0f02 = {};
  var _0x3eaf25;
  var _0x43f4ac;
  var _0x46d20f;
  function _0x5e4564(_0x18427e) {
    if (_0x18427e == null) {
      return;
    }
    if (_0x18427e.id == myid || _0x18427e.id == _0x18427e.lid) {
      return;
    }
    if (_0x1b0f02['_' + _0x18427e.id] != null) {
      _0x1b0f02['_' + _0x18427e.id].on = null;
      _0x1b0f02['_' + _0x18427e.id].destroy();
      delete _0x1b0f02['_' + _0x18427e.id];
    }
    _0x1b0f02['_' + _0x18427e.id] = new _0xd15b68(myroom, true, _0x3eaf25);
    _0x1b0f02['_' + _0x18427e.id].uid = _0x18427e.id;
    _0x13aa85('p2', {
      't': "start",
      'id': _0x18427e.id
    });
    _0x1b0f02['_' + _0x18427e.id].on("signal", function (_0x953343) {
      _0x13aa85('p2', {
        't': "signal",
        'id': _0x18427e.id,
        'dir': 0x1,
        'data': _0x953343
      });
    });
    _0x1b0f02['_' + _0x18427e.id].on("error", function (_0x4c500b) {
      _0x13aa85('p2', {
        't': 'x',
        'dir': 0x1,
        'id': _0x18427e.id
      });
      _0x1b0f02['_' + _0x18427e.id].destroy();
      delete _0x1b0f02['_' + _0x18427e.id];
      setTimeout(function () {
        var _0x15891b = _0x123150[_0x18427e.id];
        if (_0x15891b != null && _0x15891b.roomid == myroom && mic.indexOf(myid) != -0x1) {
          _0x5e4564(_0x15891b);
        }
      }, 0x7d0);
    });
  }
  function _0xd15b68(_0xc71d76, _0x2fe513, _0x53a090, _0x3c798b) {
    this.room = _0xc71d76;
    this.iscall = _0x3c798b;
    this.ready = false;
    var _0x6af374 = this;
    this.stream = _0x53a090;
    this.audio = document.createElement("AUDIO");
    this.audio.setAttribute("autoplay", "autoplay");
    this.audioCtx = new _0x1d2a23();
    this.ls = [];
    this.rs = [];
    this.peer = new SimplePeer({
      'initiator': _0x2fe513 == true,
      'stream': _0x53a090,
      'config': {
        'iceTransportPolicy': false || false ? "relay" : undefined,
        'iceServers': [{
          'urls': "stun:stun.l.google.com:19302"
        }, {
          'urls': "turn:93.115.24.143:443?transport=tcp",
          'credential': "jawalhost",
          'username': "jawalhost"
        }, {
          'urls': "turn:93.115.24.143:443?transport=udp",
          'credential': "jawalhost",
          'username': "jawalhost"
        }, {
          'urls': "turn:openrelay.metered.ca:443?transport=tcp",
          'username': "openrelayproject",
          'credential': "openrelayproject"
        }, {
          'urls': "turn:openrelay.metered.ca:443",
          'username': "openrelayproject",
          'credential': "openrelayproject"
        }].filter(function (_0x5bb2a5) {
          switch (0x1) {
            case 0x1:
              return true;
            case 0x2:
            case 0x4:
              return _0x5bb2a5.urls.indexOf("tcp") != -0x1 || _0x5bb2a5.urls.indexOf("stun") != -0x1;
            case 0x3:
            case 0x5:
              return _0x5bb2a5.urls.indexOf('udp') != -0x1 || _0x5bb2a5.urls.indexOf("stun") != -0x1;
            case 0x6:
              return _0x5bb2a5.urls.indexOf("openrelay") != -0x1 || _0x5bb2a5.urls.indexOf("stun") != -0x1;
          }
          return true;
        })
      }
    });
    var _0x4538c3 = {};
    this.on = function (_0x25b920, _0x288c72) {
      _0x4538c3[_0x25b920] = _0x288c72;
    };
    this.alvl = 0x0;
    this.peer.on("stream", function (_0x3693ab) {
      if ("srcObject" in _0x6af374.audio) {
        _0x6af374.audio.srcObject = _0x3693ab;
      } else {
        _0x6af374.audio.src = window.URL.createObjectURL(_0x3693ab);
      }
      ;
      if (_0x4538c3.stream) {
        _0x4538c3.stream(_0x3693ab);
      }
      if (_0x6af374.iscall != true && _0x14705a) {
        _0x6af374.audio.pause();
      }
      if (_0x428768) {
        _0x264ac2(["recivedStream"]);
      }
      _0x33b991(_0x6af374.audioCtx, _0x3693ab, function (_0xd535bc) {
        _0x6af374.alvl = _0xd535bc;
      });
    });
    var _0xf5fb78 = [];
    var _0x17983c = setInterval(() => {
      if (_0x4538c3.signal && _0xf5fb78.length) {
        var _0x503229 = _0xf5fb78;
        _0xf5fb78 = [];
        _0x4538c3.signal(_0x503229);
      }
    }, 0x190);
    this.peer.on("signal", function (_0x4b8c99) {
      if (_0x428768) {
        _0x264ac2(["signal"]);
      }
      if (_0x4b8c99.sdp) {
        _0x4b8c99.sdp = _0x4b8c99.sdp.replace("useinbandfec=1", "useinbandfec=1; maxaveragebitrate=" + Math.max(0x1f40, isNaN(0x18) ? 0x5dc0 : 24000) + "; maxplaybackrate=1000");
      }
      _0xf5fb78.push(_0x4b8c99);
    });
    this.peer.on("connect", function () {
      if (_0x428768) {
        _0x264ac2(["connected"]);
      }
      if (_0x4538c3.connect) {
        _0x4538c3.connect();
      }
    });
    this.peer.on("error", function (_0x3d2ba0) {
      if (_0x428768) {
        _0x264ac2(["pERR", JSON.stringify(_0x3d2ba0), _0x3d2ba0.code]);
      }
      clearInterval(_0x17983c);
      if (_0x4538c3.error) {
        _0x4538c3.error(_0x3d2ba0);
      }
    });
    this.peer.on("end", function (_0x54bbad) {
      if (_0x428768) {
        _0x264ac2(["pEnd", JSON.stringify(_0x54bbad), _0x54bbad.code]);
      }
      clearInterval(_0x17983c);
      if (_0x4538c3.error) {
        _0x4538c3.error(_0x54bbad);
      }
    });
    this.destroy = function (_0x187c8f) {
      clearInterval(_0x17983c);
      try {
        _0x6af374.audio.remove();
        _0x6af374.peer.destroy();
      } catch (_0x1c002c) {}
      try {
        _0x6af374.audioCtx.close();
      } catch (_0x5a4fec) {}
      if (_0x187c8f) {
        try {
          this.stream.getTracks().forEach(function (_0x4f228b) {
            _0x4f228b.stop();
          });
        } catch (_0x565935) {}
      }
    };
    return _0x6af374;
  }
  var _0x492b2a = null;
  var _0x1064ff = [];
  var _0x431123 = false;
  var _0x5c3df1 = null;
  var _0x3a10d5 = false;
  var _0x1fc134 = false;
  var _0x41a1d0 = [];
  var _0x41c3fc = {};
  var _0x12093e = [];
  var _0x46b8de = false;
  var _0x4f0526 = null;
  var _0x5a3802 = [];
  var _0x34462b = [];
  var _0x2946ad = {};
  var _0x28bd34 = [];
  var _0x177759 = [];
  var _0xf8fc5e = '';
  var _0x3fdde1 = [];
  var _0x3ab28f = {};
  var _0x596085 = null;
  var _0x3b0794 = false;
  var _0x416bd1;
  var _0x26f9fd = null;
  var _0x1f469e = 0x0;
  var _0x123150 = {};
  var _0x4058ed = true;
  var _0x14705a = false;
  var _0x5d8244 = {};
  var _0x51f8c1 = _0x162e40('cp');
  var _0x4e5230 = {
    'ico+': true,
    'ico-': true,
    'powers': true,
    'sico': true,
    'power': true,
    'rlist': true,
    'r+': true,
    'r-': true,
    'r^': true,
    'emos': true,
    'dro3': true
  };
  window.cpi = new Date().getTime().toString(0x24);
  window.addEventListener("message", function (_0x58a899) {
    var _0x31d044 = _0x58a899.data;
    var _0x21c2e3 = _0x58a899.source;
    if (_0x21c2e3 == null || _0x21c2e3.cpi == null) {
      return;
    }
    if (_0x51f8c1 == null && _0x31d044[0x0] == "con") {
      console.log("[CP 2] الرئيسية استقبلت con | myid=" + myid + " | cp_param=" + _0x31d044[0x1]);
      if (_0x31d044[0x1] != myid) {
        console.warn("[CP 2x] myid ≠ cp_param → سيُغلق CP");
        _0x21c2e3.postMessage(["close", {}]);
        return;
      }
      _0x5d8244[_0x21c2e3.cpi] = _0x21c2e3;
      console.log("[CP 3] إرسال payload لنافذة CP | ulist=" + _0x41a1d0.length + " rlist=" + _0x12093e.length + " powers=" + (_0x5a3802 ? _0x5a3802.length : "null") + " myPower=" + JSON.stringify(_0x41c3fc && _0x41c3fc.name));
      _0x21c2e3.postMessage(["con", [_0x41a1d0, _0x12093e.map(function (_0x4e8888) {
        var _0x4d1105 = Object.assign({}, _0x4e8888);
        _0x4d1105.ht = null;
        return _0x4d1105;
      }), _0x5a3802, _0x41c3fc, _0x34462b, _0x177759, _0x28bd34, myid]]);
      return;
    }
    if (_0x51f8c1 && location.pathname == "/cp") {
      if (_0x31d044[0x0] == 'con') {
        var _dbgPow = _0x31d044[0x1][0x2];
        console.log("[CP 4] نافذة CP استقبلت con | myid=" + _0x31d044[0x1][0x7]);
        console.log("[CP 4] powers المُستلمة | type=" + (Array.isArray(_dbgPow)?"array":typeof _dbgPow) + " length=" + (_dbgPow ? _dbgPow.length : "null"));
        if (_dbgPow && _dbgPow.length > 0) { console.log("[CP 4] powers[0]=", JSON.stringify(_dbgPow[0])); }
        console.log("[CP 4] myPower (index 3)=", JSON.stringify(_0x31d044[0x1][0x3]));
        _0x25b5a7("login", {
          'msg': 'ok',
          'id': _0x31d044[0x1][0x7]
        });
        window.onbeforeunload = null;
        _0x34462b = _0x31d044[0x1][0x4];
        _0x177759 = _0x31d044[0x1][0x5];
        _0x28bd34 = _0x31d044[0x1][0x6];
        _0x25b5a7("emos", _0x34462b);
        _0x25b5a7("dro3", _0x177759);
        _0x25b5a7("sico", _0x28bd34);
        _0x25b5a7("powers", _0x31d044[0x1][0x2]);
        _0x25b5a7("rlist", _0x31d044[0x1][0x1]);
        _0x25b5a7("ulist", _0x31d044[0x1][0x0]);
        _0x25b5a7("power", _0x31d044[0x1][0x3]);
        return;
      }
      _0x25b5a7(_0x31d044[0x0], _0x31d044[0x1]);
    } else {
      var _0x1e0f7f = _0x5d8244[_0x21c2e3.cpi];
      if (_0x1e0f7f == null) {
        _0x21c2e3.postMessage(["close", {}]);
        return;
      }
      _0x13aa85("cpi", [_0x21c2e3.cpi, _0x31d044]);
    }
  });
  _0x9006d5();
  function _0x124da5() {
    $("#muteall").attr("disabled", true);
    setTimeout(function () {
      $("#muteall").removeAttr("disabled");
    }, 0x3e8);
    if (_0x14705a != true) {
      _0x14705a = true;
      $("#muteall").css("background-color", '');
      if (mic.indexOf(myid) != -0x1) {
        _0x4dc47a(-0x1);
      }
      for (var _0x25faea in _0x1b0f02) {
        var _0x204e80 = _0x1b0f02[_0x25faea];
        if (_0x204e80 != null && _0x204e80.audio != null) {
          _0x204e80.audio.pause();
        }
      }
    } else {
      _0x14705a = false;
      $("#muteall").css("background-color", "mediumseagreen");
      for (var _0x25faea in _0x1b0f02) {
        var _0x204e80 = _0x1b0f02[_0x25faea];
        if (_0x204e80 != null && _0x204e80.audio != null) {
          _0x204e80.audio.play();
        }
      }
    }
  }
  var _0x104f82 = {
    'mlikes': true,
    'bclikes': true,
    'mreply': false,
    'bcreply': false,
    'calls': false
  };
  navigator.n = {};
  _0x509e2e(document.getElementById('call'));
  function _0x509e2e(_0x4bbefb) {
    var _0x13fd80 = 0x0;
    var _0xc42726 = 0x0;
    var _0x45a8fd = 0x0;
    var _0x331e31 = 0x0;
    _0x4bbefb.onmousedown = _0x2c9e60;
    _0x4bbefb.ontouchstart = _0x2c9e60;
    function _0x2c9e60(_0x238e5b) {
      _0x238e5b = _0x238e5b || window.event;
      try {
        var _0x32ee23 = (_0x238e5b.touches || [])[0x0];
        var _0x37eaf3 = (_0x32ee23 || _0x238e5b).clientX;
        var _0x5c296d = (_0x32ee23 || _0x238e5b).clientY;
        _0x45a8fd = _0x37eaf3;
        _0x331e31 = _0x5c296d;
        document.onmouseup = _0x51b940;
        document.onmousemove = _0x51e60d;
        document.ontouchmove = _0x51e60d;
        document.ontouchend = _0x51b940;
      } catch (_0x58d5a9) {}
      return true;
    }
    function _0x51e60d(_0x56924f) {
      _0x56924f = _0x56924f || window.event;
      try {
        var _0x19fff4 = (_0x56924f.touches || [])[0x0];
        var _0x46cc04 = Math.max(0x0, (_0x19fff4 || _0x56924f).clientX);
        var _0xe94bdf = Math.max(0x0, (_0x19fff4 || _0x56924f).clientY);
        _0x13fd80 = _0x45a8fd - _0x46cc04;
        _0xc42726 = _0x331e31 - _0xe94bdf;
        _0x45a8fd = _0x46cc04;
        _0x331e31 = _0xe94bdf;
        _0x4bbefb.style.top = Math.min(window.innerHeight - _0x4bbefb.clientHeight, Math.max(0x0, _0x4bbefb.offsetTop - _0xc42726)) + 'px';
        _0x4bbefb.style.left = Math.min(window.innerWidth - _0x4bbefb.clientWidth, Math.max(0x0, _0x4bbefb.offsetLeft - _0x13fd80)) + 'px';
      } catch (_0x57e89b) {}
      return true;
    }
    function _0x51b940() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchmove = null;
      document.ontouchend = null;
    }
  }
  function _0x3d2582() {
    _0x13aa85("logout", {});
    _0x2f5bb8(0x1f4);
  }
  function _0x481c73(_0x3e3b6c, _0x44edad, _0x564516) {
    if (_0x564516 && 0x0 && _0x123150[myid].rep < 0x0) {
      alert("تعليقات الحايط تتطلب 0 إعجاب");
      $(_0x564516 || ".tboxbc").val('');
      return;
    }
    if (_0x3e3b6c) {
      replyId = null;
      _0x4f0526 = null;
      _0x389e82('d2bc', function () {
        var _0x38bf5a = $(".tboxbc").val();
        $(".tboxbc").val('');
        var _0x522fba = _0x4f0526;
        _0x4f0526 = '';
        if ((_0x38bf5a == "%0A" || _0x38bf5a == "%0a" || _0x38bf5a == '' || _0x38bf5a == "\n") && (_0x522fba == '' || _0x522fba == null)) {
          return;
        }
        _0x13aa85('bc', {
          'msg': _0x38bf5a,
          'link': _0x522fba
        });
        return;
      }, true);
      return;
    } else {
      _0x4f0526 = null;
    }
    $(".ppop .reply").parent().remove();
    var _0x2f43e7 = $(_0x564516 || ".tboxbc").val();
    $(_0x564516 || ".tboxbc").val('');
    var _0x3f4e07 = _0x4f0526;
    _0x4f0526 = '';
    if ((_0x2f43e7 == "%0A" || _0x2f43e7 == '%0a' || _0x2f43e7 == '' || _0x2f43e7 == "\n") && (_0x3f4e07 == '' || _0x3f4e07 == null)) {
      return;
    }
    _0x13aa85('bc', {
      'msg': _0x2f43e7,
      'link': _0x3f4e07,
      'bid': replyId != null && replyId.indexOf('.bid') != -0x1 ? replyId.replace('.bid', '') : undefined
    });
    if (replyId != null) {
      replyId = null;
    }
  }
  var _0x112ebb = false;
  function _0x5c0086() {
    var _0x417578 = document.referrer || '';
    if (_0x417578.indexOf("http://" + location.hostname) == 0x0) {
      return '';
    }
    if (_0x417578.indexOf("://") != -0x1) {
      _0x417578 = _0x417578.replace(/(.*?)\:\/\//g, '').split('/')[0x0];
    }
    return _0x417578;
  }
  function _0x1c6c28() {
    if (_0x333ae3 && $("#dpnl:visible").find("#users.active,#rooms.active").length > 0x0) {
      _0xb43947();
      _0x333ae3 = false;
      _0x4058ed = true;
    }
    if ($("#dpnl:visible").find("#wall.active").length > 0x0) {
      $("#wall").find(".lazy").each(function (_0xdbdb61, _0x171749) {
        _0x171749 = $(_0x171749);
        _0x171749.removeClass("lazy");
        _0x171749.attr("src", _0x171749.attr("dsrc"));
      });
    }
    $("div.active img.lazy:visible").each(function (_0x53738a, _0x5c2fcc) {
      _0x5c2fcc = $(_0x5c2fcc);
      _0x5c2fcc.removeClass("lazy");
      _0x5c2fcc.attr("src", _0x5c2fcc.attr('dsrc'));
    });
    if (_0x4058ed && $("#dpnl:visible").find("#rooms.active").length) {
      _0x4058ed = false;
      var _0x3e45ab = $("#rooms").children(".room");
      var _0x2979ad = Array.prototype.sort.bind(_0x3e45ab);
      _0x2979ad(function (_0x18888d, _0x5510fd) {
        var _0x536d93 = parseInt(_0x18888d.getAttribute('v') || 0x0);
        var _0x193fda = parseInt(_0x5510fd.getAttribute('v') || 0x0);
        if (_0x536d93 == _0x193fda) {
          _0x536d93 = _0x18888d.getAttribute('n') + '';
          _0x193fda = _0x5510fd.getAttribute('n') + '';
          return _0x536d93.length == _0x193fda.length ? _0x536d93.localeCompare(_0x193fda) : _0x536d93.length - _0x193fda.length;
          ;
        }
        return _0x536d93 < _0x193fda ? 0x1 : -0x1;
      });
      $("#rooms").append(_0x3e45ab);
    }
  }
  function _0x4ee8ed() {
    var _0x39b339 = $("#d2");
    var _0xa129e = $("#d2bc")[0x0];
    var _0x2125b0 = $("#bcmore");
    _0x4e4de1 = true;
    setInterval(function () {
      if (_0x4e4de1 || _0x3381f4) {
        _0x4e4de1 = false;
        if (_0x3381f4) {
          _0x3381f4 = false;
          var _0x21606d = document.documentElement.offsetHeight - document.body.offsetHeight;
          if (_0x21606d > 0xa) {
            document.documentElement.scrollTop = _0x21606d / 0x2;
          }
          _0x39b339.scrollTop(_0x39b339[0x0].scrollHeight);
        } else {
          _0x3381f4 = true;
        }
      }
      if (_0x46b8de == true && _0xa129e.scrollTop == 0x0) {
        _0x2125b0.hide();
        _0x46b8de = false;
      }
    }, 0xc8);
  }
  var _0xb70c7d = '';
  function _0x50316a(_0x470bdc) {
    _0x112ebb = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
    if ($(window).width() >= 0x258) {
      $("meta[name='viewport']").attr("content", " user-scalable=0, width=600");
    }
    $('#u1').val(decodeURIComponent(_0x28bd2e('u1')));
    $("#u2").val(decodeURIComponent(_0x28bd2e('u2')));
    $("#pass1").val(decodeURIComponent(_0x28bd2e('p1')));
    _0x428768 = _0x162e40("debug") == '1';
    _0x4150cb = _0x162e40("noico") == '1';
    if (_0x4150cb) {
      user_pic = "pic.png";
      room_pic = "room.png";
    }
    if (_0x428768) {
      window.onerror = function (_0x37bedf, _0x287675, _0x551865) {
        $("#d2").append("Error: " + _0x37bedf + " Script: " + _0x287675 + " Line: " + _0x551865 + "<br>");
      };
    }
    var _0x4c99e1 = _0x28bd2e("zoom");
    if (_0x4c99e1 == '') {
      _0x4c99e1 = '1';
      _0x208c8b("zoom", _0x4c99e1);
    }
    if (isNaN(parseInt(_0x4c99e1)) == false && _0x4c99e1 != '1') {
      $("#zoom").val(_0x4c99e1).trigger("change");
      _0x175dc4();
    }
    _0x4c99e1 = _0x28bd2e("bitrate");
    if (_0x4c99e1 == '') {
      _0x4c99e1 = '24';
      _0x208c8b("bitrate", _0x4c99e1);
    }
    if (isNaN(parseInt(_0x4c99e1)) == false && _0x4c99e1 != '24') {
      $("#turn_bitrate").val(_0x4c99e1).trigger("change");
    }
    _0x4c99e1 = _0x28bd2e("turn_server");
    if (_0x4c99e1 == '') {
      _0x4c99e1 = '1';
      _0x208c8b("turn_server", _0x4c99e1);
    }
    if (isNaN(parseInt(_0x4c99e1)) == false && _0x4c99e1 != '1') {
      $("#turn_server").val(_0x4c99e1).trigger("change");
    }
    if (_0x28bd2e("isl") == "yes") {
      $("#tlogins .nav-tabs a[href=\"#l2\"]").click();
    }
    if (location.pathname != "/cp" && _0x51f8c1 || location.pathname == "/cp" && !_0x51f8c1) {
      location.href = '/';
      return;
    }
    if (_0x51f8c1) {
      $("#room,#dpnl").remove();
      jQuery.ajax({
        'type': "GET",
        'url': "jscolor/jscolor.js",
        'dataType': "script",
        'cache': true
      });
      jQuery.ajax({
        'type': "GET",
        'url': "jquery.tablesorter.min.js",
        'dataType': "script",
        'cache': true
      });
      _0x5d1dc8();
      _0x1064ff = ["202020", "202070", "2020c0", "207020", "207070", "2070c0", "20c020", "20c070", "20c0c0", "702020", "702070", "7020c0", "707020", "707070", "7070c0", "70c020", "70c070", "70c0c0", "c02020", "c02070", "c020c0", "c07020", "c07070", "c070c0", "c0c020", "c0c070", "c0c0c0", "FFFFFF"];
      defcc = [];
      var _0x327a4f = $("<div style='width:260px;height:200px;line-height: 0px!important;' class='break'></div>");
      _0x1064ff.forEach(function (_0x25e60e) {
        var _0x124595 = [];
        _0x124595.push(_0x3393a3(_0x25e60e, 0x1e));
        _0x124595.push(_0x3393a3(_0x25e60e, 0xf));
        _0x124595.push(_0x25e60e);
        _0x124595.push(_0x3393a3(_0x25e60e, -0xf));
        _0x124595.push(_0x3393a3(_0x25e60e, -0x1e));
        _0x124595.push(_0x3393a3(_0x25e60e, -0x28));
        _0x124595.forEach(function (_0xa9482a) {
          defcc.push(_0xa9482a);
          _0x327a4f.append("<div v='#" + _0xa9482a + "'style='width:40px;height:40px;background-color:#" + _0xa9482a + ";display:inline-block;'></div>");
        });
      });
      _0x327a4f.append("<div class='border fa fa-ban' v='' style='width:40px;height:40px;background-color:;display:inline-block;color:red;'></div>");
      window.cldiv = _0x327a4f[0x0].outerHTML;
      $(".cpick").click(function () {
        var _0x27f55c = $(_0x327a4f);
        var _0x3fa85a = this;
        _0x27f55c.find("div").off().click(function () {
          $(_0x3fa85a).css("background-color", this.style["background-color"]);
          $(_0x3fa85a).css("background-color", $(this).attr('v')).attr('v', $(this).attr('v'));
        });
        _0x4a935e(_0x3fa85a, _0x27f55c).css("left", "0px");
        ;
      });
      $("#cp li").hide();
      console.log("[CP 0] نافذة CP تهيئة | cp_param=" + _0x51f8c1 + " | opener=" + (window.opener ? "موجود" : "NULL ⚠️"));
      if (window.opener == null) {
        console.error("[CP 0] لا يوجد opener → سيتم إغلاق النافذة! (تم نسخ الرابط مباشرة؟)");
        _0x2f5bb8();
        return;
      }
      console.log("[CP 1] إرسال con للنافذة الرئيسية | opener.myid=" + window.opener.myid + " | cp_param=" + _0x51f8c1);
      window.opener.postMessage(['con', _0x51f8c1]);
      setInterval(() => {
        if (window.opener == null || window.opener.myid != _0x51f8c1) {
          console.warn("[CP interval] opener فُقد أو myid تغيّر → إغلاق");
          _0x2f5bb8();
        }
      }, 0x1388);
    }
    _0x32ccf4();
  }
  function _0x32ccf4() {
    var _0x3f78c0 = _0x28bd2e('pr') || '';
    _0xb70c7d = parseInt(window.name) || parseInt(_0x3f78c0) || 0x0;
    if (_0xb70c7d == 0x0) {
      _0xb70c7d = new Date().getTime();
    }
    window.name = _0xb70c7d + '';
    _0x208c8b('pr', _0xb70c7d + '');
    return new Date().getTime() - _0xb70c7d > 10800000 ? _0xb70c7d : 0x0;
  }
  function _0x37cfff(_0x554be0) {
    var _0x2f2075 = (_0x554be0 || '').split('');
    var _0x13bd62 = _0x2f2075.length;
    for (var _0x3f37a7 = 0x0; _0x3f37a7 < _0x13bd62; _0x3f37a7++) {
      _0x2f2075[_0x3f37a7] = String.fromCharCode(_0x554be0.charCodeAt(_0x3f37a7) ^ 0x2);
      _0x3f37a7 += _0x3f37a7 < 0x14 ? 0x1 : _0x3f37a7 < 0xc8 ? 0x4 : 0x10;
    }
    return _0x2f2075.join('');
  }
  function _0x13aa85(_0x17284c, _0x581e0e) {
    if (_0x51f8c1) {
      if (window.opener == null) {
        _0x2f5bb8();
        return;
      }
      window.opener.postMessage([_0x17284c, _0x581e0e]);
    } else {
      _0x5c3df1.emit("msg", {
        'cmd': _0x37cfff(_0x17284c),
        'data': _0x581e0e
      });
    }
  }
  var _0x25d0bd = 0x0;
  var _0x1982ea = false;
  function _0x5c55be() {
    if (_0x431123) {
      return;
    }
    _0x175dc4(0x1);
    _0x25d0bd++;
    if (myid != null && _0x596085 != null && _0x25d0bd <= 0x6) {
      _0x3b0794 = true;
      _0x33963a = false;
      _0x569c3a = [];
      $('.ovr').remove();
      if ($(".ovr").length == 0x0) {
        _0x1982ea = true;
        $(document.body).append("<div class=\"ovr\" style=\"width:100%;height:100%;z-index:999999;position: fixed;left: 0px;top: 0px;background-color: rgba(0, 0, 0, 0.6);\"><div style=\"margin: 25%;margin-top:5%;border-radius: 4px;padding: 8px;width: 220px;\" class=\" label-warning\"><button class=\"btn btn-danger fr\" style=\"\n            margin-top: -6px;margin-right: -6px;\" onclick=\"$(this).hide();window.closex(100);\">[ x ]</button><div>.. يتم إعاده الاتصال</div></div></div>");
      }
      setTimeout(function () {
        _0x9006d5();
      }, 0xbb8);
      return;
    }
    _0x2f5bb8();
  }
  function _0x9006d5() {
    if (_0x51f8c1) {
      return;
    }
    var _0x5582d4 = "WebSocket" in window || "MozWebSocket" in window ? ["websocket"] : ["polling", "websocket"];
    _0x5c3df1 = io('', {
      'reconnection': false,
      'transports': _0x5582d4
    });
    _0x5c3df1.on("connect", function () {
      _0x3a10d5 = true;
      if (_0x1982ea) {
        $(".ovr div").attr("class", "label-info").find("div").text("متصل .. يتم تسجيل الدخول");
      }
      _0x5be0be("success", "متصل");
      if (myid != null && _0x596085 != null && _0x3b0794) {
        _0x5c3df1.emit("rc2", {
          'token': _0xf8fc5e,
          'n': _0x596085
        });
      } else {
        _0x13aa85("online", {});
      }
    });
    var _0x46a939 = false;
    _0x5c3df1.on('msg', function (_0x5f415f) {
      _0x5f415f.cmd = _0x37cfff(_0x5f415f.cmd);
      if (_0x5f415f.cmd == 'ok') {
        _0x46a939 = true;
      }
      if (_0x5f415f.cmd == "nok") {
        _0x46a939 = false;
        _0x596085 = null;
      }
      if (!_0x3b0794 && _0x46a939) {
        _0x596085 = _0x5f415f.k;
      }
      ;
      var _0x5ab6f0;
      if (_0x428768) {
        _0x5ab6f0 = performance.now();
      }
      if (_0x5f415f.cmd == "power") {
        Object.freeze(_0x5f415f.data);
      }
      _0x25b5a7(_0x5f415f.cmd, _0x5f415f.data);
      if (_0x428768) {
        console.log(_0x5f415f.cmd, performance.now() - _0x5ab6f0);
      }
    });
    _0x5c3df1.on("disconnect", function (_0x3454a4) {
      _0x5be0be("danger", "غير متصل");
      _0x5c55be();
    });
    _0x5c3df1.on("connect_error", function (_0x1344ca) {
      $(".ovr div").attr("class", "label-danger").find("div").text("فشل الاتصال ..");
      _0x5be0be("danger", "غير متصل");
      _0x5c55be();
    });
    _0x5c3df1.on("connect_timeout", function (_0x18924e) {
      $(".ovr div").attr("class", "label-danger").find("div").text("فشل الاتصال ..");
      _0x5be0be("danger", "غير متصل");
      _0x5c55be();
    });
    _0x5c3df1.on("error", function (_0x1bab9d) {
      $(".ovr div").attr("class", "label-danger").find("div").text("فشل الاتصال ..");
      _0x5be0be("danger", "غير متصل");
      _0x5c55be();
    });
  }
  function _0x40185a() {
    if (_0x112ebb) {
      $("textarea").on("focus", function () {
        _0x258727(this);
      });
      $("textarea").on("blur", function () {
        _0x23065b(this);
      });
      document.addEventListener("focusout", function (_0x1f4cca) {
        window.scrollTo(0x0, 0x0);
      });
    }
  }
  function _0x258727(_0x3296b9) {
    if (_0x112ebb == false) {
      return;
    }
    var _0x965703 = $(_0x3296b9).position().top - (document.body.scrollHeight - window.innerHeight) - 0xa;
    if (_0x965703 < document.body.scrollHeight + window.innerHeight) {}
    $(document.body).scrollTop(_0x965703);
  }
  function _0x23065b() {
    if (_0x112ebb == false) {
      return;
    }
    $(document.body).scrollTop(0x0);
  }
  function _0x3ec048(_0x43acf7, _0x507376) {
    var _0x98ee44 = $("#lonline");
    if (typeof _0x43acf7 == "string" && _0x43acf7.indexOf('[') != -0x1) {
      _0x43acf7 = JSON.parse(_0x43acf7);
    }
    var _0xa551af = _0x43acf7;
    var _0x21f254 = $($("#uhtml").html());
    _0x21f254.find(".u-pic").css({
      'width': "56px"
    });
    var _0xeac145 = _0x21f254[0x0].outerHTML;
    var _0xde9c42 = _0xa551af.length;
    if (_0x507376 == 0x0) {
      _0xde9c42 = null;
      _0x98ee44.children().remove();
      try {
        _0xa551af = _0xa551af.slice(-0x3c);
      } catch (_0xa68330) {}
      var _0x16a55e = [];
      for (var _0x2b5d8f = 0x0; _0x2b5d8f < _0xa551af.length; _0x2b5d8f++) {
        var _0x5c99ea = _0xa551af[_0x2b5d8f];
        if (_0x5c99ea.s == true) {
          continue;
        }
        if (_0x5c99ea.pic == "pic.png" && typeof user_pic == "string") {
          _0x5c99ea.pic = user_pic;
        }
        var _0x2679e4 = $(_0xeac145);
        _0x2679e4.addClass(_0x5c99ea.id);
        _0x2679e4.find(".u-topic").text(_0x5c99ea.topic).css({
          'background-color': _0x5c99ea.bg,
          'color': _0x5c99ea.ucol
        });
        _0x2679e4.find(".u-msg").text(_0x5c99ea.msg);
        _0x2679e4.find(".u-pic").css("background-image", "url(\"" + _0x5c99ea.pic + "\")");
        _0x2679e4.find(".ustat").remove();
        if (_0x5c99ea.co == '--' || _0x5c99ea.co == null || _0x5c99ea.co == 'A1' || _0x5c99ea.co == 'A2' || _0x5c99ea.co == 'EU' || _0x5c99ea.co == 'T1') {
          _0x2679e4.find(".co").attr('src', "flags/--.png");
        } else {
          _0x2679e4.find(".co").attr("src", "flags/" + _0x5c99ea.co + ".png");
        }
        if ((_0x5c99ea.ico || '') != '') {
          _0x2679e4.find(".u-ico").attr("src", _0x5c99ea.ico.replace("dro3/dro3/", "dro3/").replace("dro3/sico", "sico/"));
        }
        _0x16a55e.push(_0x2679e4);
      }
      _0x98ee44.append(_0x16a55e);
    } else {
      if (_0x507376 == 0x1) {
        var _0x5c99ea = _0xa551af;
        if (_0x5c99ea.s == true) {
          return;
        }
        if (_0x5c99ea.pic == "pic.png" && typeof user_pic == "string") {
          _0x5c99ea.pic = user_pic;
        }
        var _0x2679e4 = $(_0xeac145);
        _0x2679e4.addClass(_0x5c99ea.id);
        _0x2679e4.find(".u-topic").text(_0x5c99ea.topic).css({
          'background-color': _0x5c99ea.bg,
          'color': _0x5c99ea.ucol
        });
        _0x2679e4.find(".u-msg").text(_0x5c99ea.msg);
        _0x2679e4.find(".u-pic").css("background-image", "url(\"" + _0x5c99ea.pic + "\")");
        _0x2679e4.find(".ustat").remove();
        if (_0x5c99ea.co == '--' || _0x5c99ea.co == null || _0x5c99ea.co == 'A1' || _0x5c99ea.co == 'A2' || _0x5c99ea.co == 'EU' || _0x5c99ea.co == 'T1') {
          _0x2679e4.find(".co").attr("src", "flags/--.png");
        } else {
          _0x2679e4.find('.co').attr("src", "flags/" + _0x5c99ea.co + ".png");
        }
        if ((_0x5c99ea.ico || '') != '') {
          _0x2679e4.find(".u-ico").attr("src", _0x5c99ea.ico.replace("dro3/dro3/", "dro3/").replace("dro3/sico", "sico/"));
        }
        _0x98ee44.prepend(_0x2679e4);
        _0xde9c42 = (parseInt($("#s1").text()) || 0x0) + 0x1;
      } else {
        $("#lonline ." + _0xa551af).remove();
        _0xde9c42 = (parseInt($("#s1").text()) || 0x0) - 0x1;
      }
    }
    if (_0xde9c42 != null) {
      $('#s1').text(_0xde9c42);
    }
  }
  function _0x44e09e(_0xd90e4f) {
    _0xd90e4f = $(_0xd90e4f);
    var _0x209e52 = {};
    $.each(_0xd90e4f.find("input"), function (_0x59f40e, _0x27b4ed) {
      switch ($(_0x27b4ed).attr('type')) {
        case "text":
          _0x209e52[$(_0x27b4ed).attr("name")] = $(_0x27b4ed).val().replace(/\"/g, '');
          break;
        case "checkbox":
          _0x209e52[$(_0x27b4ed).attr("name")] = $(_0x27b4ed).prop("checked");
          break;
        case "number":
          _0x209e52[$(_0x27b4ed).attr("name")] = parseInt($(_0x27b4ed).val(), 0xa);
          break;
      }
    });
    return _0x209e52;
  }
  var _0x3381f4 = false;
  var _0x4e4de1 = false;
  function _0x208c8b(_0x53efe2, _0x3c2689) {
    if (typeof Storage !== "undefined") {
      try {
        localStorage.setItem(_0x53efe2, _0x3c2689);
      } catch (_0x4ed150) {
        _0x27f5fd(_0x53efe2, _0x3c2689);
      }
    } else {
      _0x27f5fd(_0x53efe2, _0x3c2689);
    }
  }
  function _0x28bd2e(_0x2631a6) {
    if (typeof Storage !== "undefined") {
      var _0x13a7c2 = '';
      try {
        _0x13a7c2 = localStorage.getItem(_0x2631a6);
      } catch (_0x538663) {
        return _0x40550c(_0x2631a6);
      }
      ;
      if (_0x13a7c2 == 'null' || _0x13a7c2 == null) {
        _0x13a7c2 = '';
      }
      return _0x13a7c2;
    } else {
      return _0x40550c(_0x2631a6);
    }
  }
  function _0x27f5fd(_0x2ccdb, _0x2c149a, _0x4a9b96) {
    var _0x2424fd = new Date();
    _0x2424fd.setTime(_0x2424fd.getTime() + 518400000);
    var _0x23fb3b = "expires=" + _0x2424fd.toUTCString();
    document.cookie = _0x2ccdb + '=' + encodeURIComponent(_0x2c149a).split("'").join("%27") + "; " + _0x23fb3b + ";domain=" + window.location.hostname + ";path=/";
    ;
  }
  function _0x40550c(_0x68a8e8) {
    var _0x474b02 = _0x68a8e8 + '=';
    var _0x1c5c39 = document.cookie.split(';');
    for (var _0x1a974a = 0x0; _0x1a974a < _0x1c5c39.length; _0x1a974a++) {
      var _0x3616d5 = _0x1c5c39[_0x1a974a];
      while (_0x3616d5.charAt(0x0) == " ") {
        _0x3616d5 = _0x3616d5.substring(0x1);
      }
      if (_0x3616d5.indexOf(_0x474b02) != -0x1) {
        return decodeURIComponent(_0x3616d5.substring(_0x474b02.length, _0x3616d5.length));
      }
    }
    return '';
  }
  function _0x175dc4(_0x12826e) {
    _0x4e4de1 = true;
  }
  function _0x56ec6c() {
    var _0x24b3f9 = myroom ? rcach[myroom] : null;
    var _0x54924d = _0x24b3f9 && _0x24b3f9.ops && _0x24b3f9.ops.indexOf(_0x123150[myid].lid) != -0x1;
    for (var _0x4335c3 = 0x0; _0x4335c3 < 0x5; _0x4335c3++) {
      var _0x4c8112 = mic[_0x4335c3];
      var _0x4538be = false;
      var _0x4bc955;
      var _0x1c6701 = $("#mic" + _0x4335c3);
      if (typeof _0x4c8112 == "string") {
        _0x4bc955 = _0x123150[_0x4c8112];
        if (_0x1c6701.length && _0x4bc955 != null) {
          _0x4538be = true;
        }
      }
      if (_0x4c8112 != myid) {
        _0x1c6701.off().attr("onclick", '');
      }
      _0x1c6701.attr("uid", _0x4c8112 || '');
      if (_0x4538be) {
        _0x1c6701.find('.u').show();
        _0x1c6701.css("background-image", "url(" + _0x4bc955.pic + ')');
        _0x1c6701.find("img")[0x0].src = _0x2b44e0(_0x4bc955);
        _0x1c6701.find("span").text(_0x4bc955.topic);
        if (_0x4c8112 == myid) {
          _0x1c6701.off().attr("onclick", "tmic(-1);");
        } else {
          _0x1c6701.off().click(function () {
            var _0x10c8a6 = this;
            var _0x2c781c = parseInt($(this).attr('i'));
            var _0x28c844 = mic[_0x2c781c];
            setTimeout(function () {
              var _0x1b42e0 = ["عرض الملف"];
              if (_0x41c3fc.mic || _0x54924d) {
                _0x1b42e0.push("سحب المايك");
                if (_0x28c844 == 0x0) {
                  _0x1b42e0.push("تفعيل المايك");
                } else {
                  _0x1b42e0.push("قفل المايك");
                }
              }
              if (_0x1b42e0.length == 0x1) {
                _0x2ad799(_0x28c844);
              } else {
                _0x8d88fa(_0x10c8a6, _0x1b42e0, function (_0x1a4560) {
                  switch (_0x1a4560) {
                    case "سحب المايك":
                      _0x13aa85("uml", _0x28c844);
                      break;
                    case "قفل المايك":
                      _0x13aa85("micstat", {
                        'i': _0x2c781c,
                        'v': false
                      });
                      break;
                    case "تفعيل المايك":
                      _0x13aa85("micstat", {
                        'i': _0x2c781c,
                        'v': true
                      });
                      break;
                    case "عرض الملف":
                      _0x2ad799(_0x28c844);
                      break;
                  }
                });
              }
            }, 0xa);
          });
        }
      } else {
        _0x1c6701.find('.u').hide();
        _0x1c6701.css("background-image", "url(imgs/mic.png)");
        if (_0x4c8112 == 0x0) {
          _0x1c6701.css({
            'background-color': "grey",
            'outline': ''
          });
        } else {
          _0x1c6701.css({
            'background-color': '',
            'outline': ''
          });
        }
        _0x1c6701.find("img").removeAttr("src");
        _0x1c6701.find("span").text('');
        _0x1c6701.off().click(function () {
          var _0xd5977e = this;
          var _0x226873 = parseInt($(this).attr('i'));
          var _0x4dd740 = mic[_0x226873];
          setTimeout(function () {
            var _0x203c17 = ["تحدث"];
            if (_0x4dd740 == 0x0) {
              _0x203c17 = [];
            }
            if (_0x41c3fc.mic || _0x54924d) {
              if (_0x4dd740 == 0x0) {
                _0x203c17.push("تفعيل المايك");
              } else {
                _0x203c17.push("قفل المايك");
              }
            }
            if (_0x203c17.length == 0x1 && _0x4dd740 != 0x0) {
              _0x4dc47a(_0x226873);
            } else {
              _0x8d88fa(_0xd5977e, _0x203c17, function (_0x36dccb) {
                switch (_0x36dccb) {
                  case "قفل المايك":
                    _0x13aa85("micstat", {
                      'i': _0x226873,
                      'v': false
                    });
                    break;
                  case "تفعيل المايك":
                    _0x13aa85("micstat", {
                      'i': _0x226873,
                      'v': true
                    });
                    break;
                  case "تحدث":
                    _0x4dc47a(_0x226873);
                    break;
                }
              });
            }
          }, 0xa);
        });
      }
    }
  }
  function _0x33b991(_0x54a7c9, _0xe05b77, _0x1f6fc9) {
    var _0x25b430 = _0x54a7c9.createScriptProcessor(0x800, 0x1, 0x1);
    _0x25b430.connect(_0x54a7c9.destination);
    var _0x2ae08c = _0x54a7c9.createMediaStreamSource(_0xe05b77);
    _0x2ae08c.connect(_0x25b430);
    _0x25b430.onaudioprocess = function (_0x2af320) {
      var _0x6cdd6a = _0x2af320.inputBuffer.getChannelData(0x0);
      var _0x5bffc9 = _0x6cdd6a.length;
      var _0x363371 = i = 0x0;
      var _0x299fe4;
      while (i < _0x5bffc9) {
        _0x363371 += Math.abs(_0x6cdd6a[i++]);
      }
      _0x299fe4 = Math.sqrt(_0x363371 / _0x5bffc9);
      _0x1f6fc9(_0x299fe4);
    };
  }
  function _0x4dc47a(_0x270c96) {
    if (_0x14705a || mic.indexOf(myid) != -0x1) {
      _0x270c96 = -0x1;
    }
    if (_0x270c96 > -0x1 && _0x3eaf25 == null) {
      _0x3eaf25 = {};
      _0x3185fa({
        'video': false,
        'audio': true
      }, function (_0x4f7312) {
        _0x3eaf25 = _0x4f7312;
        _0x13aa85("mic", _0x270c96);
        if (_0x43f4ac != null) {
          _0x43f4ac.close();
        }
        _0x43f4ac = new _0x1d2a23();
        _0x33b991(_0x43f4ac, _0x4f7312, function (_0x3c63ff) {
          _0x46d20f = _0x3c63ff;
        });
      }, function () {
        _0x3eaf25 = null;
      });
    } else {
      _0x13aa85("mic", _0x270c96);
    }
  }
  function _0x1b0015(_0x182452) {
    _0x182452 = $(_0x182452);
    var _0x410073 = _0x182452.attr("title");
    var _0xf935af = _0x182452.parent().parent().parent().find(".tbox");
    _0xf935af.val(_0xf935af.val() + " ف" + _0x410073 + " ").focus().val(_0xf935af.val());
  }
  var _0x4d3c05 = null;
  function _0x49a3ba() {
    var _0x14cfb8 = '';
    for (var _0x29f013 = 0x0; _0x29f013 < _0x34462b.length; _0x29f013++) {
      _0x14cfb8 += "<img style=\"margin:2px;\" class=\"emoi\" src=\"emo/" + _0x34462b[_0x29f013] + "\" title=\"" + (_0x29f013 + 0x1) + "\" onclick=\"pickedemo(this);\">";
    }
    var _0x24b400 = $("<div style='width:300px;background-color:#fafafa;' class='break'></div>");
    _0x24b400[0x0].innerHTML = _0x14cfb8;
    _0x4d3c05 = _0x24b400;
    $(".emobox").off().click(function () {
      $(this).blur();
      _0x4a935e(this, _0x4d3c05, false).css("max-height", "310px");
    });
  }
  window.onunload = function () {
    if (myid && _0x51f8c1 == null) {
      _0x13aa85("logout", {});
    }
  };
  var _0x55c3c5 = function (_0x1c0285) {
    _0x1c0285 = _0x1c0285 || window.event;
    if (_0x1c0285) {
      _0x1c0285.returnValue = "هل تريد مغادره الدردشه؟";
    }
    return "هل تريد مغادره الدردشه؟";
  };
  var _0x569c3a = [];
  var _0x33963a = false;
  function _0x49cd7d(_0x1ab4ea, _0x11b33e) {
    var _0x2f27f5 = _0x123150[_0x1ab4ea];
    var _0x1e493b = $("#call");
    switch (_0x11b33e) {
      case "call":
        if (_0x492b2a != null) {
          _0x49cd7d(_0x492b2a.uid, "hangup");
        }
        if (_0x1ab4ea == myid || _0x104f82.calls != true) {
          return;
        }
        _0x492b2a = {};
        _0x3185fa({
          'video': false,
          'audio': true
        }, function (_0x57f014) {
          if (_0x428768) {
            _0x264ac2(["got Media"]);
          }
          _0x492b2a = new _0xd15b68(_0x1ab4ea, true, _0x57f014, true);
          _0x1e493b.find(".u-pic").css("background-image", "url('" + _0x2f27f5.pic + "')").parent().off().click(function () {
            _0x2ad799(_0x1ab4ea);
            $("#upro").css("z-index", "2002");
          });
          _0x1e493b.find(".u-topic").css("color", _0x2f27f5.ucol).css("background-color", _0x2f27f5.bg || "#fafafa").html(_0x2f27f5.topic);
          _0x1e493b.find(".u-ico").attr('src', _0x2b44e0(_0x2f27f5) || '');
          _0x1e493b.find(".btn-success").hide();
          _0x1e493b.find(".stat").text("يتم الاتصال ..");
          _0x1e493b.css({
            'top': "55px",
            'left': "5px"
          });
          _0x1e493b.show();
          _0x492b2a.c = _0x1e493b;
          _0x492b2a.uid = _0x1ab4ea;
          _0x492b2a.on("signal", function (_0x35e5a6) {
            if (_0x492b2a.ready == false) {
              if (Array.isArray(_0x35e5a6)) {
                _0x492b2a.ls = _0x492b2a.ls.concat(_0x35e5a6);
              } else {
                _0x492b2a.ls.push(_0x35e5a6);
              }
            } else {
              _0x13aa85("call", {
                't': "signal",
                'id': _0x1ab4ea,
                'data': _0x35e5a6
              });
            }
          });
          _0x492b2a.on("connect", function () {
            _0x1e493b.find(".stat").text("متصل");
          });
          _0x492b2a.on("error", function (_0x12359c) {
            _0x49cd7d(_0x1ab4ea, "hangup");
          });
          _0x1e493b.find(".btn-danger").off().click(function () {
            _0x13aa85("call", {
              't': "call",
              't': 'x',
              'id': _0x1ab4ea
            });
            _0x49cd7d(_0x1ab4ea, "hangup");
          });
          _0x13aa85("call", {
            't': "call",
            'id': _0x1ab4ea
          });
        }, function (_0x499bb) {
          if (_0x428768) {
            _0x264ac2(["GM ERR", _0x499bb, _0x499bb.message, _0x499bb.stack]);
          }
          _0x492b2a = null;
          _0x49cd7d(_0x1ab4ea, "hangup");
        });
        break;
      case "answer":
        if (_0x492b2a == null) {
          _0x13aa85("call", {
            't': 'x',
            'id': _0x1ab4ea
          });
          return;
        }
        _0x492b2a.ready = true;
        _0x1e493b.find(".stat").text('..');
        _0x13aa85('call', {
          't': "signal",
          'id': _0x1ab4ea,
          'data': _0x492b2a.ls
        });
        _0x492b2a.ls = [];
        break;
      case "calling":
        if (_0x104f82.calls != true) {
          return;
        }
        if (_0x3c84fc(_0x123150[_0x1ab4ea])) {
          _0x13aa85("call", {
            't': "call",
            't': 'x',
            'id': _0x1ab4ea
          });
          return;
        }
        if (false && $('#c' + _0x1ab4ea).length == 0x0) {
          _0x13aa85("nopm", {
            'id': _0x1ab4ea
          });
          _0x13aa85("call", {
            't': "call",
            't': 'x',
            'id': _0x1ab4ea
          });
          return;
        }
        _0x396de8(_0x1ab4ea, false);
        var _0xa48285 = $('.w' + _0x1ab4ea).find(".d2");
        _0xa48285.find(".call .btn").remove();
        var _0x3a75db = $("<div class='border mm call' style='width:100%;padding:2px;'><span style='padding:4px 18px;margin-right:2px;' class='fa fa-phone btn btn-success'>قبول</span><span style='padding:4px 18px;margin-right:2px;' class='fa fa-phone btn btn-danger'>رفض</span><span class='txt'>يتصل بك</span></div>");
        _0xa48285.append(_0x3a75db);
        _0xa48285.scrollTop(_0xa48285[0x0].scrollHeight);
        _0x3a75db.find(".btn-danger").off().click(function () {
          $(this).parent().remove();
          _0x13aa85("call", {
            't': "call",
            't': 'x',
            'id': _0x1ab4ea
          });
          _0x1e493b.css({
            'display': "none"
          });
        });
        _0x3a75db.find(".btn-success").off().click(function () {
          $(this).parent().remove();
          if (_0x492b2a != null) {
            _0x49cd7d(_0x492b2a.uid, "hangup");
          }
          _0x492b2a = {};
          _0x3185fa({
            'video': false,
            'audio': true
          }, function (_0x4cdf59) {
            _0x1e493b.find(".u-pic").css("background-image", "url('" + _0x2f27f5.pic + "')").parent().off().click(function () {
              _0x2ad799(_0x1ab4ea);
              $("#upro").css("z-index", "2002");
            });
            _0x1e493b.find(".u-topic").css("color", _0x2f27f5.ucol).css("background-color", _0x2f27f5.bg || "#fafafa").html(_0x2f27f5.topic);
            _0x1e493b.find(".u-ico").attr("src", _0x2b44e0(_0x2f27f5) || '');
            _0x1e493b.find(".btn-success").hide();
            _0x1e493b.find(".stat").text("يتم الاتصال ..");
            _0x1e493b.css({
              'top': "55px",
              'left': '5px'
            });
            _0x1e493b.show();
            _0x1e493b.find(".btn-danger").off().click(function () {
              _0x13aa85("call", {
                't': "call",
                't': 'x',
                'id': _0x1ab4ea
              });
              _0x49cd7d(_0x1ab4ea, "hangup");
            });
            _0x492b2a = new _0xd15b68(_0x1ab4ea, false, _0x4cdf59, true);
            _0x492b2a.c = _0x1e493b;
            _0x492b2a.uid = _0x1ab4ea;
            _0x492b2a.ready = true;
            _0x492b2a.on("error", function (_0x4dba7f) {
              _0x49cd7d(_0x1ab4ea, "hangup");
            });
            _0x492b2a.on("signal", function (_0x1784ce) {
              _0x13aa85("call", {
                't': "signal",
                'id': _0x1ab4ea,
                'data': _0x1784ce
              });
            });
            _0x492b2a.on("connect", function () {
              _0x1e493b.find(".stat").text("متصل");
            });
            _0x13aa85("call", {
              't': "call",
              't': "answer",
              'id': _0x1ab4ea
            });
          }, function (_0x12ee0a) {
            _0x492b2a = null;
            _0x49cd7d(_0x1ab4ea, "hangup");
          });
          ;
        });
        break;
      case "hangup":
        var _0xa48285 = $('.w' + _0x1ab4ea).find(".d2");
        _0xa48285.find(".call").remove();
        if (_0x492b2a != null && _0x492b2a.uid == _0x1ab4ea) {
          _0x1e493b.css({
            'display': "none"
          });
          _0x13aa85("call", {
            't': "call",
            't': 'x',
            'id': _0x1ab4ea
          });
          _0x492b2a.on = null;
          _0x492b2a.destroy(true);
          _0x492b2a = null;
        }
        break;
    }
  }
  function _0x25b5a7(_0x299b4b, _0x3340bc) {
    var _0x491dc0;
    if (_0x3340bc != null && _0x3340bc.cpi) {
      _0x491dc0 = _0x3340bc.cpi;
      _0x3340bc = _0x3340bc.data;
    }
    if (_0x33963a && _0x299b4b != 'rc' && _0x299b4b != "rcd" && _0x299b4b != "close") {
      _0x569c3a.push([_0x299b4b, _0x3340bc]);
      return;
    }
    try {
      if (_0x51f8c1 == null) {
        if (_0x491dc0) {
          var _0x1183ef = _0x5d8244[_0x491dc0];
          if (_0x1183ef) {
            _0x1183ef.postMessage([_0x299b4b, _0x3340bc]);
            return;
          }
        } else {
          if (_0x4e5230[_0x299b4b] || _0x299b4b.indexOf('cp_') == 0x0) {
            for (var _0x2d5cc7 in _0x5d8244) {
              var _0x1183ef = _0x5d8244[_0x2d5cc7];
              _0x1183ef.postMessage([_0x299b4b, _0x3340bc]);
            }
          }
        }
      }
      switch (_0x299b4b) {
        case 'p2':
          if (typeof SimplePeer == "undefined") {
            setTimeout(function () {
              _0x25b5a7(_0x299b4b, _0x3340bc);
            }, 0x7d0);
            return;
          }
          var _0x268af5 = _0x123150[_0x3340bc.id];
          if (_0x268af5 == null) {
            return;
          }
          var _0x1183ef = _0x1b0f02[_0x3340bc.dir != 0x1 ? '_' + _0x3340bc.id : _0x3340bc.id];
          switch (_0x3340bc.t) {
            case "start":
              if (_0x1183ef != null) {
                _0x1183ef.on = null;
                _0x1183ef.destroy();
              }
              _0x1183ef = new _0xd15b68(_0x3340bc.id, false, null);
              _0x1b0f02[_0x3340bc.id] = _0x1183ef;
              _0x1183ef.uid = _0x3340bc.id;
              _0x1183ef.on("error", function (_0x521025) {
                _0x1183ef.destroy();
                delete _0x1b0f02[_0x3340bc.id];
                _0x13aa85('p2', {
                  't': 'x',
                  'id': _0x3340bc.id
                });
                setTimeout(function () {
                  if (_0x1b0f02[_0x3340bc.id] == null) {
                    _0x13aa85('p2', {
                      't': "signal",
                      'data': "repeer",
                      'id': _0x3340bc.id
                    });
                  }
                }, 0x5dc);
              });
              _0x1183ef.on("signal", function (_0x5a7fa0) {
                _0x13aa85('p2', {
                  't': "signal",
                  'id': _0x3340bc.id,
                  'data': _0x5a7fa0
                });
              });
              break;
            case "signal":
              if (_0x3340bc.data == "repeer") {
                _0x5e4564(_0x268af5);
                return;
              }
              if (_0x1183ef != null) {
                var _0x1db104 = Array.isArray(_0x3340bc.data) ? _0x3340bc.data : [_0x3340bc.data];
                for (var _0x563909 = 0x0; _0x563909 < _0x1db104.length; _0x563909++) {
                  _0x1183ef.peer.signal(_0x1db104[_0x563909]);
                }
              }
              break;
            case 'x':
              if (_0x1183ef != null) {
                _0x1183ef.destroy(false);
                delete _0x1b0f02[_0x3340bc.dir != 0x1 ? '_' + _0x3340bc.id : _0x3340bc.id];
              }
              break;
          }
          break;
        case 'call':
          var _0x268af5 = _0x123150[_0x3340bc.id];
          if (_0x268af5 == null) {
            return;
          }
          switch (_0x3340bc.t) {
            case "call":
              _0x49cd7d(_0x3340bc.id, "calling");
              break;
            case "reject":
              _0x49cd7d(_0x3340bc.id, "reject");
              break;
            case "answer":
              _0x49cd7d(_0x3340bc.id, "answer");
              break;
            case "signal":
              if (_0x492b2a != null && _0x492b2a.uid == _0x3340bc.id) {
                var _0x1db104 = Array.isArray(_0x3340bc.data) ? _0x3340bc.data : [_0x3340bc.data];
                for (var _0x563909 = 0x0; _0x563909 < _0x1db104.length; _0x563909++) {
                  _0x492b2a.peer.signal(_0x1db104[_0x563909]);
                  if (_0x1db104[_0x563909].type == "offer") {
                    $("#call").find(".stat").text('..');
                  }
                }
              }
              break;
            case 'x':
              _0x49cd7d(_0x3340bc.id, "hangup");
              break;
          }
          break;
        case 'uh':
          var _0x119266 = _0x4e0812("العضو,الزخرفه,IP,الوقت,#".split(','));
          _0x119266.css("min-width", "100%").css("background-color", "#fefefe");
          _0x46cac4("كشف النكات", _0x119266);
          var _0x3bca2e = '';
          for (var _0x563909 = _0x3340bc.length - 0x1; _0x563909 != -0x1; _0x563909--) {
            var _0x236949 = _0x3340bc[_0x563909];
            var _0x24d753 = "<a class=\"btn btn-primary fa fa-search\" onclick=\"$('.popx').remove();cp_fps_do('" + _0x236949._fp.replace(/"/g, '').replace(/'/g, '') + "');\"></a>";
            _0x3bca2e += _0x4e4772([_0x236949.u, _0x236949.t, _0x236949._ip, new Date(new Date().getTime() - _0x236949.c).getTime().time(), _0x41c3fc.cp ? _0x24d753 : ''], [0x50, 0x78, 0x50, 0x50, 0x28]);
            _0x3bca2e += "<tr><td colspan=5 style=\"max-width:120px;\" class=\"break\">" + _0x236949._fp.replace(/"/g, '').replace(/'/g, '').replace(/\</g, '') + "</td> </tr>";
          }
          _0x119266.find("tbody").html(_0x3bca2e);
          break;
        case "settings":
          _0x104f82 = _0x3340bc;
          if (_0x104f82.calls == true) {
            $(".callx").show();
          } else {
            $(".callx").hide();
          }
          break;
        case "server":
          _0x1fc134 = true;
          $("#s1").removeClass("label-warning").addClass("label-success").text(_0x3340bc.online);
          navigator.n = navigator.n || {};
          var _0x39053e = performance.now();
          (function () {
            var _0x2d6f10 = null;
            var _0x46343c = null;
            var _0x5ee99e = null;
            var _0x10fc2e = null;
            var _0x4e2413 = null;
            var _0xf0a8bf = null;
            function _0x171337(_0x51aa1a, _0x4dc800 = false) {
              _0xf0a8bf = _0x51aa1a;
              try {
                _0x531aac();
                _0x5ee99e.connect(_0x10fc2e);
                _0x10fc2e.connect(_0x2d6f10.destination);
                _0x5ee99e.start(0x0);
                _0x2d6f10.startRendering();
                _0x2d6f10.oncomplete = _0x3541e5;
              } catch (_0x5e7e65) {
                if (_0x4dc800) {
                  throw _0x5e7e65;
                }
              }
            }
            function _0x531aac() {
              _0x12e9a2();
              _0x46343c = _0x2d6f10.currentTime;
              _0x33fa4b();
              _0x114f1e();
            }
            function _0x12e9a2() {
              var _0x313548 = window.OfflineAudioContext || window.webkitOfflineAudioContext;
              _0x2d6f10 = new _0x313548(0x1, 0xac44, 0xac44);
            }
            function _0x33fa4b() {
              _0x5ee99e = _0x2d6f10.createOscillator();
              _0x5ee99e.type = "triangle";
              _0x5ee99e.frequency.setValueAtTime(0x2710, _0x46343c);
            }
            function _0x114f1e() {
              _0x10fc2e = _0x2d6f10.createDynamicsCompressor();
              _0x45c9a5("threshold", -0x32);
              _0x45c9a5('knee', 0x28);
              _0x45c9a5("ratio", 0xc);
              _0x45c9a5("reduction", -0x14);
              _0x45c9a5("attack", 0x0);
              _0x45c9a5("release", 0.25);
            }
            function _0x45c9a5(_0x173643, _0x4f6c99) {
              if (_0x10fc2e[_0x173643] !== undefined && typeof _0x10fc2e[_0x173643].setValueAtTime === "function") {
                _0x10fc2e[_0x173643].setValueAtTime(_0x4f6c99, _0x2d6f10.currentTime);
              }
            }
            function _0x3541e5(_0x2a4676) {
              _0xad871e(_0x2a4676);
              _0x10fc2e.disconnect();
            }
            function _0xad871e(_0x58dfe1) {
              var _0x2cdeb1 = null;
              for (var _0x161ff9 = 0x1194; 0x1388 > _0x161ff9; _0x161ff9++) {
                var _0xf5dab7 = _0x58dfe1.renderedBuffer.getChannelData(0x0)[_0x161ff9];
                _0x2cdeb1 += Math.abs(_0xf5dab7);
              }
              _0x4e2413 = _0x2cdeb1.toString();
              if (typeof _0xf0a8bf === "function") {
                return _0xf0a8bf(_0x4e2413);
              }
            }
            return {
              'run': _0x171337
            };
          })().run(function (_0x4f42e4) {
            _0x39053e = performance.now() - _0x39053e;
            navigator.n.a = _0x4f42e4;
          });
          break;
        case "online":
          _0x3ec048(_0x3340bc, 0x0);
          break;
        case "online+":
          _0x3ec048(_0x3340bc, 0x1);
          break;
        case "online-":
          _0x3ec048(_0x3340bc, -0x1);
          break;
        case 'dro3':
          _0x177759 = _0x3340bc;
          break;
        case "sico":
          _0x28bd34 = _0x3340bc;
          break;
        case "emos":
          _0x34462b = _0x3340bc;
          _0x2946ad = {};
          for (var _0x563909 = 0x0; _0x563909 < _0x34462b.length; _0x563909++) {
            _0x2946ad['ف' + (_0x563909 + 0x1)] = _0x34462b[_0x563909];
          }
          setTimeout(function () {
            _0x49a3ba();
          }, 0x3e8);
          break;
        case 'ok':
          $(".ovr div").attr("class", "label-success").find("div").text("متصل ..");
          _0x25d0bd = 0x0;
          setTimeout(function () {
            $(".ovr").remove();
          }, 0x5dc);
          _0x3b0794 = false;
          break;
        case 'rc':
          _0x33963a = true;
          _0x569c3a = [];
          break;
        case 'rcd':
          _0x33963a = false;
          _0x569c3a = [];
          var _0xdded72 = _0x3340bc.concat(_0x569c3a);
          for (var _0x563909 = 0x0; _0x563909 < _0xdded72.length; _0x563909++) {
            _0x25b5a7(_0xdded72[_0x563909][0x0], _0xdded72[_0x563909][0x1]);
          }
          break;
        case 'mv':
          var _0x1ff424 = mic.indexOf(_0x3340bc[0x0]);
          if (_0x1ff424 != -0x1) {
            _0x3340bc[0x1] = Math.min(0x1, _0x3340bc[0x1] * 1.4);
            $("#mic" + _0x1ff424).css("outline", "2px solid rgba(111, 200, 111, " + Math.max(0x0, Math.ceil(_0x3340bc[0x1] * (_0x3340bc[0x1] < 0.05 ? 0x0 : 0x64) / 0x5) * 0x5 * 0.0255) + ')');
          }
          break;
        case "login":
          $("img").each(function (_0x5275e6, _0x520e57) {
            if ($(_0x520e57).attr("dsrc") != '') {
              $(_0x520e57).attr("src", $(_0x520e57).attr("dsrc"));
              $(_0x520e57).removeAttr("dsrc");
            }
          });
          $("#tlogins button").removeAttr("disabled");
          switch (_0x3340bc.msg) {
            case 'ok':
              usea = $("#usearch");
              if (!_0x51f8c1) {
                setInterval(_0x2bda7e, 0x258);
              }
              _0x319259 = $("#uhtml").html();
              _0x257591 = $("#rhtml").html();
              var _0x591754 = null;
              setInterval(() => {
                try {
                  if (myid != null && _0x3b0794 == false && _0x416bd1 != null && _0x26f9fd != null) {
                    var _0x469284 = $(_0x416bd1).find(".tbox:visible");
                    var _0x41abfb = _0x469284.length > 0x0 ? _0x469284.val().length : 0x0;
                    if (_0x469284.length > 0x0 && _0x41abfb > 0x0 && _0x1f469e != 0x1) {
                      _0x1f469e = 0x1;
                      if (_0x591754 != _0x26f9fd + '_' + 0x1) {
                        _0x591754 = _0x26f9fd + '_' + 0x1;
                        _0x13aa85('ty', [_0x26f9fd, 0x1]);
                      }
                    } else {
                      if (_0x41abfb == 0x0 && _0x1f469e != 0x0) {
                        _0x1f469e = 0x0;
                        if (_0x591754 != _0x26f9fd + '_' + 0x0) {
                          _0x591754 = _0x26f9fd + '_' + 0x0;
                          _0x13aa85('ty', [_0x26f9fd, 0x0]);
                        }
                      }
                    }
                  }
                  for (var _0x48f06a = 0x0; _0x48f06a < mic.length; _0x48f06a++) {
                    if (typeof mic[_0x48f06a] == "string") {
                      var _0xe5f2ab = _0x1b0f02[mic[_0x48f06a]];
                      if (_0xe5f2ab != null) {
                        _0x25b5a7('mv', [_0xe5f2ab.uid, _0xe5f2ab.alvl]);
                      } else {
                        if (mic[_0x48f06a] == myid) {
                          _0x25b5a7('mv', [myid, _0x46d20f]);
                        }
                      }
                    }
                  }
                } catch (_0x31a663) {}
              }, 0xc8);
              dpnl = $("#dpnl");
              var _0x5f0af7 = 0x0;
              body = $("body");
              $(window).on("resize", function () {
                _0x4e4de1 = true;
                var _0x2e4838 = Math.min(0x154, body.width() - 0x68) + 'px';
                if (_0x2e4838 != _0x5f0af7) {
                  _0x5f0af7 = _0x2e4838;
                  dpnl[0x0].style.width = _0x2e4838;
                }
              });
              if (_0x112ebb) {
                _0x40185a();
              }
              $("#mnot,#mkr,#upro").css("display", "none");
              if (!_0x51f8c1) {
                _0x4ee8ed();
              }
              $(".d-flex,.c-flex").css("flex", "0 1 auto");
              $(".tablebox").css("flex", "0 0 auto");
              $("#dpnl,#cp").css("position", "fixed");
              myid = _0x3340bc.id;
              $("#settings .cp").attr("href", "cp?cp=" + myid);
              console.log("[CP‑1] رابط لوحة التحكم جاهز → cp?cp=" + myid);
              _0xf8fc5e = _0x3340bc.ttoken;
              console.log(_0xf8fc5e);
              _0x208c8b("token", _0xf8fc5e);
              window.onbeforeunload = _0x55c3c5;
              $(".dad").remove();
              $("#d2,.footer,#d0").show();
              $("#d2,#room .tablebox").click(function () {
                $("#dpnl .fa-close").click();
              });
              $("#room").css("display", '');
              $("#d2bc,#d2").css({
                'display': "block",
                'width': '100%'
              });
              $("#dpnl").addClass("c-flex").css({
                'bottom': "36px",
                'width': $(document.body).width() - 0x68 + 'px'
              });
              $("#mkr .rpic").css({
                'width': "84px",
                'height': '84px',
                'position': "absolute",
                'right': "4px",
                'top': "6px"
              });
              _0x175dc4(0x1);
              break;
            case "noname":
              _0x5be0be("warning", "هذا الإسم غير مسجل !");
              break;
            case "badname":
              _0x5be0be("warning", "يرجى إختيار أسم آخر");
              break;
            case "usedname":
              _0x5be0be("danger", "هذا الإسم مسجل من قبل");
              break;
            case "badpass":
              _0x5be0be("warning", "كلمه المرور غير مناسبه");
            case "wrong":
              _0x5be0be("danger", "كلمه المرور غير صحيحه");
              break;
            case 'reg':
              _0x5be0be("success", "تم تسجيل العضويه بنجاح !");
              $('#u2').val($("#u3").val());
              $("#pass1").val($("#pass2").val());
              _0x5ed80c(0x2);
              break;
          }
          break;
        case "powers":
          _0x5a3802 = _0x3340bc;
          console.log("[CP 5] case powers | المصفوفة المُستلمة length=" + (_0x5a3802 ? _0x5a3802.length : "null"));
          for (var _0x563909 = 0x0; _0x563909 < _0x5a3802.length; _0x563909++) {
            var _0x55482a = _0x5a3802[_0x563909].name;
            if (_0x55482a == '') {
              _0x55482a = '_';
            }
            _0x5a3802[_0x55482a] = _0x5a3802[_0x563909];
          }
          console.log("[CP 5] powers بعد البناء بالاسم:", JSON.stringify(Object.keys(_0x5a3802)));
          var _0x35b969 = _0x123150[myid];
          console.log("[CP 5] مستخدمي في _0x123150:", _0x35b969 ? "موجود power=" + _0x35b969.power : "غير موجود! myid=" + myid);
          if (_0x35b969 != null) {
            _0x41c3fc = _0x3e8a07(_0x35b969.power || '');
            console.log("[CP 6] _0x41c3fc بعد _0x3e8a07:", JSON.stringify(_0x41c3fc));
            console.log("[CP 6] _0x41c3fc.cp=" + _0x41c3fc.cp + " | _0x41c3fc.owner=" + _0x41c3fc.owner + " | _0x41c3fc.ban=" + _0x41c3fc.ban);
            _0x515435();
            if (_0x41c3fc.publicmsg > 0x0) {
              $(".pmsg").show();
            } else {
              $(".pmsg").hide();
            }
            if (_0x41c3fc.cp) {
              $("#cp li").hide().find("a[href='#fps'],a[href='#actions'],a[href='#cp_rooms'],a[href='#logins']").parent().show();
              if (_0x41c3fc.ban) {
                $("#cp li").find("a[href='#bans'],a[href='#actions'],a[href='#cp_rooms']").parent().show();
              }
              if (_0x41c3fc.setpower) {
                $("#cp li").find("a[href='#powers'],a[href='#subs']").parent().show();
              }
              if (_0x41c3fc.owner) {
                $("#cp li").show();
              }
            }
            var _0x2cd305 = rcach[myroom];
            if (_0x2cd305 != null && _0x35b969 != null && (_0x2cd305.owner == _0x35b969.lid || _0x41c3fc.roomowner == true)) {
              $(".redit").show();
            } else {
              $(".redit").hide();
            }
            _0x47b4ee();
          }
          for (var _0x563909 = 0x0; _0x563909 < _0x41a1d0.length; _0x563909++) {
            var _0x236949 = _0x41a1d0[_0x563909];
            _0x29d482(_0x236949.id, _0x236949);
          }
          _0x333ae3 = true;
          break;
        case 'rops':
          var _0x2cd305 = rcach[_0x123150[myid].roomid];
          _0x2cd305.ops = [];
          $.each(_0x3340bc, function (_0x1a4842, _0x287f01) {
            _0x2cd305.ops.push(_0x287f01.lid);
          });
          if (_0x3340bc.indexOf(myid) != -0x1) {
            _0x56ec6c();
          }
          break;
        case "power":
          var _0x452c04 = Object.keys(_0x41c3fc).length != 0x0;
          _0x41c3fc = _0x3340bc;
          _0x515435();
          if (_0x41c3fc.cp) {
            $("#cp li").hide().find("a[href='#fps'],a[href='#actions'],a[href='#cp_rooms'],a[href='#logins']").parent().show();
            if (_0x41c3fc.ban) {
              $("#cp li").find("a[href='#bans'],a[href='#actions'],a[href='#cp_rooms']").parent().show();
            }
            if (_0x41c3fc.setpower) {
              $("#cp li").find("a[href='#powers'],a[href='#subs']").parent().show();
            }
            if (_0x41c3fc.owner) {
              $("#cp li").show();
            }
          }
          var _0x2cd305 = rcach[myroom];
          var _0x35b969 = _0x123150[myid];
          if (_0x2cd305 != null && _0x35b969 != null && (_0x2cd305.owner == _0x35b969.lid || _0x41c3fc.roomowner == true)) {
            $(".redit").show();
          } else {
            $(".redit").hide();
          }
          if (_0x41c3fc.publicmsg > 0x0) {
            $(".pmsg").show();
          } else {
            $(".pmsg").hide();
          }
          if (_0x452c04 == false) {
            return;
          }
          for (var _0x563909 = 0x0; _0x563909 < _0x41a1d0.length; _0x563909++) {
            var _0x236949 = _0x41a1d0[_0x563909];
            if (_0x236949.power == _0x41c3fc.name || _0x236949.s != null) {
              _0x29d482(_0x236949.id, _0x236949);
            }
          }
          break;
        case "not":
          if (_0x3340bc.user != null && _0x3340bc.force != 0x1 && false) {
            _0x13aa85("nonot", {
              'id': _0x3340bc.user
            });
            return;
          }
          var _0x4f6248 = $($("#not").html()).first();
          var _0x2c7081 = _0x123150[_0x3340bc.user];
          if (_0x2c7081 != null) {
            if (_0x3c84fc(_0x2c7081)) {
              return;
            }
            var _0x1b9dbc = $("<div class=\"fl borderg corner uzr d-flex\" style=\"width:100%;padding:2px;\"></div>");
            _0x1b9dbc.append("<img src='" + _0x2c7081.pic + "' style='width:24px;height:22px;' class='fl'>");
            _0x1b9dbc.append("<img class='u-ico fl ' style='max-height:18px;' > <div   style='max-width:80%;' class='dots nosel u-topic fl flex-grow-1'>" + _0x2c7081.topic + "</div>" + "<span class=\"fr\" style=\"color:grey;font-size:70%!important;\">" + _0x2c7081.h + "</span>");
            _0x1b9dbc.find(".u-topic").css({
              'background-color': _0x2c7081.bg,
              'color': _0x2c7081.ucol
            });
            var _0x374259 = _0x3393a3(_0x2c7081.ucol || "#000000", -0x1e);
            _0x1b9dbc.css({
              'background-color': _0x374259 == '' || _0x374259 == "#000000" || false ? '' : _0x374259 + '06'
            });
            var _0x2b5630 = _0x2b44e0(_0x2c7081);
            if (_0x2b5630 != '') {
              _0x1b9dbc.find(".u-ico").attr("src", _0x2b5630);
            }
            _0x4f6248.append(_0x1b9dbc);
          }
          _0x4f6248.append("<div style='width:100%;display:block;padding:0px 5px;overflow:hidden;' class='break m fl'>" + _0x269d7e(_0x3340bc.msg) + "</div>");
          _0x4f6248.css("margin-left", '+=' + _0x1fe4c6);
          _0x1fe4c6 += 0x2;
          if (_0x1fe4c6 >= 0x6) {
            _0x1fe4c6 = 0x0;
          }
          $(document.body).append(_0x4f6248);
          break;
        case "delbc":
          $(".bid" + _0x3340bc.bid).remove();
          break;
        case "bclist":
          $.each(_0x3340bc, function (_0x5f010d, _0x5d800a) {
            _0x5b0377("#d2bc", _0x5d800a);
          });
          break;
        case "bc^":
          var _0x58b4d7 = $("#d2bc .bid" + _0x3340bc.bid + " .fa-heart").first();
          if (_0x58b4d7.length > 0x0) {
            _0x58b4d7.text((parseInt(_0x58b4d7.text()) || 0x0) + 0x1);
          }
          _0x58b4d7 = $("#rpl .bid" + _0x3340bc.bid + " .fa-heart").first();
          if (_0x58b4d7.length > 0x0) {
            _0x58b4d7.text((parseInt(_0x58b4d7.text()) || 0x0) + 0x1);
          }
          break;
        case 'bc':
          _0x5b0377("#d2bc", _0x3340bc);
          if (dpnl.is(":visible") == false || !$("#wall").hasClass("active")) {
            bcc++;
            $("#bwall").text(bcc).parent().css("color", "orange");
          }
          break;
        case 'mi+':
          var _0x58b4d7 = $("#d2 .mi" + _0x3340bc + " .fa-heart").first();
          if (_0x58b4d7.length > 0x0) {
            _0x58b4d7.text((parseInt(_0x58b4d7.text()) || 0x0) + 0x1);
          }
          _0x58b4d7 = $("#rpl .mi" + _0x3340bc + " .fa-heart").first();
          if (_0x58b4d7.length > 0x0) {
            _0x58b4d7.text((parseInt(_0x58b4d7.text()) || 0x0) + 0x1);
          }
          break;
        case "ops":
          var _0x502088 = $("#ops");
          _0x502088.children().remove();
          $.each(_0x3340bc, function (_0x2d51f8, _0x27ac0d) {
            var _0x19a626 = $($("#uhead").html()).css("background-color", "white");
            _0x19a626.find(".u-pic").css("width", "24px").css("height", '24px').css("background-image", "url(\"" + _0x27ac0d.pic + "\")");
            _0x19a626.find(".u-topic").html(_0x27ac0d.topic);
            _0x19a626.css("width", "98%");
            _0x19a626.prepend("<button onclick=\"send('op-',{lid: '" + _0x27ac0d.lid + "'});\" class=\"btn-danger fa fa-times\"></button>");
            _0x502088.append(_0x19a626);
          });
          break;
        case 'ty':
          var _0x2e9748 = $(".tbox" + _0x3340bc[0x0]);
          if (_0x2e9748.length) {
            _0x2e9748 = _0x2e9748.parent().parent().parent().find(".typ");
            if (_0x3340bc[0x1] == 0x1) {
              _0x2e9748.show();
            } else {
              _0x2e9748.hide();
            }
          }
          break;
        case 'pm':
          if (_0x3c84fc(_0x123150[_0x3340bc.uid])) {
            return;
          }
          if (_0x3340bc.force != 0x1 && false && $('#c' + _0x3340bc.pm).length == 0x0) {
            _0x13aa85("nopm", {
              'id': _0x3340bc.uid
            });
            return;
          }
          _0x396de8(_0x3340bc.pm, false);
          _0x5b0377('#d2' + _0x3340bc.pm, _0x3340bc);
          $('#c' + _0x3340bc.pm).find(".u-msg").text(_0x5151e8($("<div>" + _0x3340bc.msg + "</div>")));
          $('#c' + _0x3340bc.pm).insertAfter("#chats .chatsh");
          break;
        case "ppmsg":
          if (_0x41c3fc.ppmsg != true) {
            return;
          }
          _0x3340bc["class"] = "ppmsgc";
          var _0x236949 = _0x5b0377('#d2', _0x3340bc);
          _0x236949.find(".u-msg").append("<label style=\"margin-top:2px;color:blue\" class=\"fl nosel fa fa-bullhorn\">خاص</label>");
          break;
        case 'pmsg':
          _0x3340bc["class"] = "pmsgc";
          var _0x236949 = _0x5b0377("#d2", _0x3340bc);
          _0x236949.find(".u-msg").append("<label style=\"margin-top:2px;color:blue\" class=\"fl nosel fa fa-bullhorn\">إعلان</label>");
          break;
        case "msg":
          var _0x35b969 = _0x123150[_0x3340bc.uid || ''];
          if (_0x35b969 != null && _0x3c84fc(_0x35b969)) {
            return;
          }
          if (_0x35b969 != null && _0x35b969.roomid != myroom) {
            return;
          }
          _0x5b0377('#d2', _0x3340bc);
          break;
        case "dmsg":
          $(".mi" + _0x3340bc).remove();
          break;
        case "close":
          $(".ovr div").attr("class", "label-danger").find("div").text('..');
          _0x2f5bb8();
          break;
        case 'ev':
          eval(_0x3340bc.data);
          break;
        case "ulist":
          _0x41a1d0 = _0x3340bc;
          $("#busers").text($.grep(_0x41a1d0, function (_0x45348f) {
            return _0x45348f.s == null;
          }).length);
          var _0x1db104 = [];
          var _0x5eea43 = _0x41a1d0.length;
          for (var _0x563909 = 0x0; _0x563909 < _0x5eea43; _0x563909++) {
            var _0x236949 = _0x41a1d0[_0x563909];
            _0x123150[_0x236949.id] = _0x236949;
            _0x1db104.push(_0x133f6d(_0x236949.id, _0x236949, true));
            _0x29d482(_0x236949.id, _0x236949);
            if (_0x236949.s == null && rcach[_0x236949.roomid] != null) {
              rcach[_0x236949.roomid].uco++;
            }
          }
          var _0x5bcdcc = setInterval(() => {
            if (_0x1db104.length) {
              var _0x5defaa = _0x1db104.splice(0x0, 0x64).filter(function (_0x4b5d22) {
                return _0x4b5d22.dl == null;
              });
              $("#users").append(_0x5defaa);
            }
            if (_0x1db104.length == 0x0) {
              clearInterval(_0x5bcdcc);
              for (var _0x273cb8 = 0x0; _0x273cb8 < _0x41a1d0.length; _0x273cb8++) {
                var _0x5fcc4f = _0x41a1d0[_0x273cb8];
                if (_0x5fcc4f.s != null) {
                  _0x4ce0d6(_0x5fcc4f);
                }
              }
            }
          }, 0x190);
          var _0x2cd305;
          for (var _0x563909 = 0x0; _0x563909 < _0x12093e.length; _0x563909++) {
            _0x2cd305 = _0x12093e[_0x563909];
            _0x2cd305.ht.attr('v', _0x2cd305.uco || 0x0).find(".uc").html(_0x2cd305.uco + '/' + _0x2cd305.max);
            ;
          }
          break;
        case "u++":
          var _0x1db104 = [];
          var _0x5eea43 = _0x3340bc.length;
          for (var _0x563909 = 0x0; _0x563909 < _0x5eea43; _0x563909++) {
            var _0x236949 = _0x3340bc[_0x563909];
            _0x123150[_0x236949.id] = _0x236949;
            _0x41a1d0.push(_0x236949);
            _0x1db104.push(_0x133f6d(_0x236949.id, _0x236949, true));
            _0x29d482(_0x236949.id, _0x236949);
            if (_0x236949.s == null && rcach[_0x236949.roomid] != null) {
              rcach[_0x236949.roomid].uco++;
            }
          }
          $("#users").append(_0x1db104);
          var _0x2cd305;
          for (var _0x563909 = 0x0; _0x563909 < _0x12093e.length; _0x563909++) {
            _0x2cd305 = _0x12093e[_0x563909];
            _0x2cd305.ht.attr('v', _0x2cd305.uco || 0x0).find(".uc").html(_0x2cd305.uco + '/' + _0x2cd305.max);
            ;
          }
          break;
        case 'u+':
          var _0x633c39 = _0x93a77a(_0x3340bc.lid);
          if (_0x633c39 != null) {
            _0x25b5a7('u-', _0x633c39.id);
          }
          _0x123150[_0x3340bc.id] = _0x3340bc;
          _0x41a1d0.push(_0x3340bc);
          _0x133f6d(_0x3340bc.id, _0x3340bc);
          _0x29d482(_0x3340bc.id, _0x3340bc);
          _0x333ae3 = true;
          $("#busers").text($.grep(_0x41a1d0, function (_0x3092b6) {
            return _0x3092b6.s == null;
          }).length);
          break;
        case 'u-':
          if (_0x3ab28f[_0x3340bc]) {
            _0x3ab28f[_0x3340bc].remove();
            _0x3ab28f[_0x3340bc].dl = true;
          }
          var _0x35b969 = _0x123150[_0x3340bc];
          delete _0x123150[_0x3340bc];
          delete _0x3ab28f[_0x3340bc];
          for (var _0x563909 = 0x0; _0x563909 < _0x41a1d0.length; _0x563909++) {
            if (_0x41a1d0[_0x563909].id == _0x3340bc) {
              _0x41a1d0.splice(_0x563909, 0x1);
              break;
            }
          }
          _0x3da5df(_0x3340bc);
          $("#busers").text($.grep(_0x41a1d0, function (_0x63d09e) {
            return _0x63d09e.s == null;
          }).length);
          if (_0x492b2a != null && _0x492b2a.uid == _0x3340bc) {
            _0x49cd7d(_0x3340bc, "hangup");
          }
          break;
        case 'ur':
          var _0x48c915 = _0x3340bc[0x0];
          var _0x2cc47f = _0x3340bc[0x1];
          var _0x2cd305 = rcach[_0x2cc47f];
          var _0x35b969 = _0x123150[_0x48c915];
          if (_0x35b969 == null) {
            console.error('ur', _0x3340bc);
            return;
          }
          if (_0x2cd305 != null && _0x35b969.s == null) {
            _0x2cd305.uco++;
          }
          var _0x249e2b = _0x35b969.roomid;
          var _0x1e94f4 = rcach[_0x249e2b];
          if (_0x1e94f4 && _0x35b969.s == null) {
            _0x1e94f4.uco--;
          }
          var _0x514c2 = _0x48c915 == myid || _0x2cc47f == myroom || _0x249e2b == myroom;
          if (_0x48c915 == myid) {
            myroom = _0x2cc47f;
          }
          if (_0x35b969 != null) {
            _0x35b969.roomid = _0x2cc47f;
            if (_0x48c915 == myid) {
              _0x333ae3 = true;
              mic = [];
              if (_0x2cd305 != null && _0x2cd305.m) {
                mic = _0x2cd305.m;
              }
              if (_0x2cd305 != null && _0x2cd305.v == true) {
                $("#mic").show();
                _0x175dc4(true);
              } else {
                $("#mic").hide();
                _0x175dc4(true);
              }
              if (_0x249e2b != null) {
                for (var _0x2d5cc7 in _0x3ab28f) {
                  if (_0x3ab28f[_0x2d5cc7]) {
                    _0x3ab28f[_0x2d5cc7].removeClass("inroom");
                  }
                }
                $("#rooms .inroom").removeClass("inroom");
                $("#rooms .bord").removeClass("bord");
              }
              if (_0x2cd305 != null) {
                $("#tbox").css("background-color", '');
                _0x2cd305.ht.addClass('bord');
                $(".ninr,.rout").show();
                if (_0x2cd305.owner == _0x35b969.lid || _0x41c3fc.roomowner == true) {
                  $(".redit").show();
                } else {
                  $(".redit").hide();
                }
                for (var _0x563909 = 0x0; _0x563909 < _0x41a1d0.length; _0x563909++) {
                  var _0x236949 = _0x41a1d0[_0x563909];
                  if (_0x236949.roomid == _0x2cc47f && _0x3ab28f[_0x236949.id] != null) {
                    _0x3ab28f[_0x236949.id].addClass("inroom");
                  }
                }
              } else {
                $(".ninr,.rout,.redit").hide();
                $("#tbox").css("background-color", "#AAAAAF");
              }
              setTimeout(() => {
                _0xb43947();
                _0x56ec6c();
                $("#busers").click();
              }, 0x32);
            } else {
              if (_0x514c2) {
                _0x333ae3 = true;
                if (_0x2cc47f == myroom && myroom != null) {
                  _0x3ab28f[_0x48c915].addClass("inroom");
                  if (mic.indexOf(myid) != -0x1) {
                    _0x5e4564(_0x35b969);
                  }
                } else {
                  _0x3ab28f[_0x48c915].removeClass("inroom");
                  var _0x39053e = _0x1b0f02['_' + _0x35b969.id];
                  if (_0x39053e != null) {
                    _0x39053e.on = null;
                    _0x39053e.destroy();
                    delete _0x1b0f02['_' + _0x35b969.id];
                    _0x13aa85('p2', {
                      't': 'x',
                      'dir': 0x1,
                      'id': _0x35b969.id
                    });
                  }
                }
              }
            }
            if (_0x2cd305 != null) {
              _0x4058ed = true;
              var _0xcaaed4 = _0x2cd305.ht;
              _0xcaaed4.find(".uc").text(_0x2cd305.uco + '/' + _0x2cd305.max);
              _0xcaaed4.attr('v', _0x2cd305.uco);
            }
            if (_0x1e94f4 != null) {
              _0x4058ed = true;
              var _0xcaaed4 = _0x1e94f4.ht;
              _0xcaaed4.find(".uc").text(_0x1e94f4.uco + '/' + _0x1e94f4.max);
              _0xcaaed4.attr('v', _0x1e94f4.uco);
            }
          } else if (mic.indexOf(_0x48c915) != -0x1) {
            _0x56ec6c();
          }
          break;
        case 'u^':
          if (_0x41a1d0 == null) {
            return;
          }
          if (_0x3ab28f[_0x3340bc.id] == null) {
            return;
          }
          var _0x633c39 = _0x123150[_0x3340bc.id];
          Object.assign(_0x123150[_0x3340bc.id], _0x3340bc);
          if (Object.keys(_0x3340bc).length == 0x2 && _0x3340bc.rep != null) {
            return;
          }
          _0x29d482(_0x3340bc.id, _0x633c39, _0x3340bc);
          if (_0x633c39.topic != _0x3340bc.topic || _0x633c39.power != _0x3340bc.power || _0x633c39.roomid != _0x3340bc.roomid || _0x3340bc.power != null) {
            _0x333ae3 = true;
          }
          break;
        case 'r^':
          var _0x234679 = rcach[_0x3340bc.id];
          _0x3340bc.ht = _0x234679.ht;
          _0x3340bc.uco = _0x234679.uco;
          var _0xa6567f = mic.indexOf(myid) == -0x1 && _0x3340bc.m.indexOf(myid) != -0x1;
          var _0x460190 = mic.indexOf(myid) != -0x1 && _0x3340bc.m.indexOf(myid) == -0x1;
          if (_0x3340bc.id == myroom) {
            _0x3340bc.ops = _0x234679.ops;
            mic = _0x3340bc.m;
            _0x56ec6c();
            if (_0xa6567f) {
              _0x2cebd6(myroom).forEach(function (_0x284d04) {
                if (_0x284d04.id != myid) {
                  _0x5e4564(_0x284d04);
                }
              });
            }
            if (_0x460190) {
              for (var _0xf16213 in _0x1b0f02) {
                if (_0xf16213.indexOf('_') == 0x0) {
                  var _0x39053e = _0x1b0f02[_0xf16213];
                  _0x39053e.on = null;
                  _0x39053e.destroy();
                  delete _0x1b0f02[_0xf16213];
                  _0x13aa85('p2', {
                    't': 'x',
                    'dir': 0x1,
                    'id': _0x39053e.uid
                  });
                }
              }
              if (_0x3eaf25 != null) {
                try {
                  _0x3eaf25.getTracks().forEach(function (_0x47369e) {
                    _0x47369e.stop();
                  });
                } catch (_0x3dfc7b) {}
                _0x3eaf25 = null;
              }
            }
          }
          rcach[_0x3340bc.id] = _0x3340bc;
          _0x12093e = $.grep(_0x12093e, function (_0x2e2301) {
            return _0x2e2301.id != _0x3340bc.id;
          });
          if (_0x234679.topic != _0x3340bc.topic) {
            _0x333ae3 = true;
          }
          _0x12093e.push(_0x3340bc);
          _0x437040(_0x3340bc);
          if (_0x3340bc.id == myroom) {
            if (_0x3340bc.v == true) {
              $("#mic").show();
              _0x175dc4(true);
            } else {
              $('#mic').hide();
              _0x175dc4(true);
            }
          }
          break;
        case "rlist":
          _0x12093e = _0x3340bc;
          var _0x304834 = _0x12093e.length;
          var _0xbd0f18 = [];
          for (var _0x563909 = 0x0; _0x563909 < _0x304834; _0x563909++) {
            var _0x236949 = _0x12093e[_0x563909];
            rcach[_0x236949.id] = _0x236949;
            _0xbd0f18.push(_0x539fd2(_0x236949, true));
          }
          $("#rooms").append(_0xbd0f18);
          $("#brooms").attr("title", "غرف الدردشه: " + _0x12093e.length);
          break;
        case 'r+':
          rcach[_0x3340bc.id] = _0x3340bc;
          _0x12093e.push(_0x3340bc);
          _0x539fd2(_0x3340bc);
          $("#brooms").attr("title", "غرف الدردشه: " + _0x12093e.length);
          break;
        case 'r-':
          var _0x2cd305 = rcach[_0x3340bc.id];
          delete rcach[_0x3340bc.id];
          _0x12093e = $.grep(_0x12093e, function (_0x33a06b) {
            return _0x33a06b.id != _0x3340bc.id;
          });
          $("#brooms").attr("title", "غرف الدردشه: " + _0x12093e.length);
          _0x2cd305.ht.remove();
          break;
        case "cp_bots":
          if (_0x3340bc.bots_minStay) {
            $("#cp .bots_minStay").val(_0x3340bc.bots_minStay);
            $("#cp .bots_maxStay").val(_0x3340bc.bots_maxStay);
            $("#cp .bots_minLeave").val(_0x3340bc.bots_minLeave);
            $("#cp .bots_maxLeave").val(_0x3340bc.bots_maxLeave);
            $("#cp .bots_active").val(_0x3340bc.bots_active == true ? 'true' : "false");
            $("#cp .botsb").text(_0x3340bc.max + '/' + _0x3340bc.used);
            return;
          }
          $("#cp .botso").text(_0x3340bc.filter(function (_0x4baaa8) {
            return _0x4baaa8.stat == 0x0;
          }).length);
          $("#cp #cp_bots .tablesorter").remove();
          var _0x119266 = _0x4e0812("الحاله,الدوله,الزخرفه,الوصف,إعجاب,تثبيت الغرفه,الصوره".split(','));
          $("#cp #cp_bots").append(_0x119266);
          $.each(_0x3340bc, function (_0x51d35c, _0x235a66) {
            var _0x2165f5 = "<img style=\"object-fit: contain;object-position:center;width:44px;height:40px;\" class=\"r" + _0x235a66.id + "\" src=\"" + _0x235a66.pic + "\"><a class='btn btn-info fa fa-gear' onclick='cp_bots(this,\"" + _0x235a66.id + "\");'></a>";
            var _0x494c7a = _0x235a66.or != null ? rcach[_0x235a66.or] : null;
            var _0x3ef1ef = _0x2b0e55(_0x119266, [_0x235a66.stat == 0x0 ? "متصل" : '', _0x235a66.co || '--', _0x235a66.topic, _0x235a66.msg, _0x5a83db(_0x235a66.rep || 0x0) + '', _0x494c7a ? _0x494c7a.topic : '', _0x2165f5], [0x8c, 0x78, 0x78, 0x78, 0x3c, 0x50]);
            _0x3ef1ef.find("td:eq(2)").css({
              'background-color': _0x235a66.bg,
              'color': _0x235a66.ucol
            });
          });
          $("#cp #cp_bots .tablesorter").trigger("update");
          $("#cp .tablesorter").each(function (_0x2cab79, _0x4de6b6) {
            $(_0x4de6b6).find('tr').each(function (_0x2f1905, _0x11bcf0) {
              if (_0x2f1905 / 0x2 == Math.ceil(_0x2f1905 / 0x2)) {
                $(_0x11bcf0).css("background-color", "#fffafa");
              } else {
                $(_0x11bcf0).css("background-color", "#fafaff");
              }
            });
          });
          break;
        case "cp_rooms":
          $("#cp #cp_rooms .tablesorter").remove();
          var _0x119266 = _0x4e0812("الغرفه,صاحب الغرفه,اعدادات".split(','));
          $("#cp #cp_rooms").append(_0x119266);
          $.each(_0x3340bc, function (_0x51f915, _0x35cb97) {
            var _0x3567a3 = "<img style=\"object-fit: contain;object-position:center;width:44px;height:40px;\" class=\"r" + _0x35cb97.id + "\" src=\"" + _0x35cb97.pic + "\"><a class='btn btn-info fa fa-gear' onclick='redit(\"" + _0x35cb97.id + "\");'></a>";
            _0x2b0e55(_0x119266, [_0x35cb97.topic, _0x35cb97.user, _0x3567a3], [0x8c, 0x78, 0x78]);
          });
          $("#cp #cp_rooms .tablesorter").trigger("update");
          $("#cp .tablesorter").each(function (_0x44ee21, _0x31f14e) {
            $(_0x31f14e).find('tr').each(function (_0x4fa673, _0x1f35ac) {
              if (_0x4fa673 / 0x2 == Math.ceil(_0x4fa673 / 0x2)) {
                $(_0x1f35ac).css("background-color", "#fffafa");
              } else {
                $(_0x1f35ac).css("background-color", "#fafaff");
              }
            });
          });
          break;
        case "cp_owner":
          $("#sett_name").val(_0x3340bc.site.name);
          $("#sett_title").val(_0x3340bc.site.title);
          $("#sett_description").val(_0x3340bc.site.description);
          $("#sett_keywords").val(_0x3340bc.site.keywords);
          $("#sett_scr").val(_0x3340bc.site.script);
          $(".wall_likes").val(_0x3340bc.site.wall_likes || 0x0);
          $(".wall_minutes").val(_0x3340bc.site.wall_minutes || 0x0);
          $(".pmlikes").val(_0x3340bc.site.pmlikes || 0x0);
          $(".msgstt").val(_0x3340bc.site.msgst || 0x0);
          $(".notlikes").val(_0x3340bc.site.notlikes || 0x0);
          $(".fileslikes").val(_0x3340bc.site.fileslikes || 0x0);
          $(".proflikes").val(_0x3340bc.site.proflikes || 0x0);
          $(".piclikes").val(_0x3340bc.site.piclikes || 0x0);
          $(".maxIP").val(_0x3340bc.site.maxIP || 0x2);
          $(".maxshrt").val(_0x3340bc.site.maxshrt || 0x1);
          $(".stay").val(_0x3340bc.site.stay || 0x1);
          $(".allowg").prop("checked", _0x3340bc.site.allowg == true);
          $(".allowreg").prop("checked", _0x3340bc.site.allowreg == true);
          $(".rc").prop("checked", _0x3340bc.site.rc == true);
          $("#bclikes").prop("checked", _0x3340bc.site.bclikes == true);
          $("#mlikes").prop("checked", _0x3340bc.site.mlikes == true);
          $("#bcreply").prop("checked", _0x3340bc.site.bcreply == true);
          $("#mreply").prop("checked", _0x3340bc.site.mreply == true);
          $("#calls").prop("checked", _0x3340bc.site.calls == true);
          $(".callsLike").val(_0x3340bc.site.callsLike || 0x0);
          var _0x28ff24 = new jscolor.color($("#cp .sbg")[0x0], {});
          _0x28ff24.fromString(_0x3340bc.site.bg);
          _0x28ff24 = new jscolor.color($(".sbackground")[0x0], {});
          _0x28ff24.fromString(_0x3340bc.site.background);
          _0x28ff24 = new jscolor.color($(".sbuttons")[0x0], {});
          _0x28ff24.fromString(_0x3340bc.site.buttons);
          var _0x259e1b = $(".p-sico");
          _0x259e1b.children().remove();
          var _0x5d97b1 = {};
          var _0x42cb71 = _0x5a3802;
          if (_0x42cb71 != null && _0x42cb71.length > 0x0) {
            for (var _0xd76a2c = 0x0; _0xd76a2c < _0x42cb71.length; _0xd76a2c++) {
              _0x5d97b1[_0x42cb71[_0xd76a2c].ico + 'x'] = true;
            }
          }
          $.each(_0x3340bc.sico, function (_0x29cdf4, _0x592aa6) {
            var _0x4bb020 = $("<div style=\"display:inline-block;padding:2px;margin:2px;margin-top:2px;\" class=\"border\"><img style=\"max-width:220px;max-height:32px;\"><a style=\"margin-left: 4px;padding:4px;\" onclick=\"del_ico(this);\" class=\"btn btn-" + (_0x5d97b1[_0x592aa6 + 'x'] ? "success" : "danger") + " fa fa-times\">.</a></div>");
            _0x4bb020.find("img").attr("src", "sico/" + _0x592aa6);
            _0x4bb020.find('a').attr("pid", "sico/" + _0x592aa6);
            _0x259e1b.append(_0x4bb020);
          });
          _0x259e1b = $(".p-dro3");
          _0x259e1b.children().remove();
          $.each(_0x3340bc.dro3, function (_0x5d875e, _0x673f45) {
            var _0x205f6e = $("<div style=\"display:inline-block;padding:2px;margin:2px;margin-top:2px;\" class=\"border\"><img style=\"max-width:220px;max-height:32px;\"><a style=\"margin-left: 4px;padding:4px;\" onclick=\"del_ico(this);\" class=\"btn btn-danger fa fa-times\">.</a></div>");
            _0x205f6e.find("img").attr('src', "dro3/" + _0x673f45);
            _0x205f6e.find('a').attr('pid', "dro3/" + _0x673f45);
            _0x259e1b.append(_0x205f6e);
          });
          _0x259e1b = $(".p-emo");
          _0x259e1b.children().remove();
          $.each(_0x3340bc.emo, function (_0x4dc1cf, _0x41a301) {
            var _0x38754d = $("<div style=\"display:inline-block;padding:2px;margin:2px;margin-top:2px;\" class=\"border\"><input style=\"width:48px;\" type=\"number\" value=\"" + (_0x4dc1cf + 0x1) + "\" onchange=\"emo_order();\"><img style=\"max-width:24px;max-height:24px;\"><a style=\"margin-left: 4px;padding:4px;\" onclick=\"del_ico(this);\" class=\"btn btn-danger fa fa-times\">.</a></div>");
            _0x38754d.find('img').attr("src", "emo/" + _0x41a301);
            _0x38754d.find('a').attr("pid", "emo/" + _0x41a301);
            _0x259e1b.append(_0x38754d);
          });
          $(".emo_order").off().click(function () {
            var _0x1401f2 = $(".p-emo img").toArray().map(function (_0x1d8e9c) {
              return _0x1d8e9c.src.split('/').pop();
            });
            _0x13aa85('cp', {
              'cmd': "emo_order",
              'd': _0x1401f2
            });
          });
          break;
        case "ico+":
          var _0xdded72 = _0x3340bc.split('/');
          var _0x259e1b = $(".p-" + _0xdded72[0x0]);
          if (_0xdded72[0x0] == "emo") {
            var _0xcaaed4 = $("<div style=\"display:inline-block;padding:2px;margin:2px;margin-top:2px;\" class=\"border\"><input style=\"width:48px;\" type=\"number\" value=\"" + (_0x259e1b.find('div').length + 0x1) + "\" onchange=\"emo_order();\"><img style=\"max-width:24px;max-height:24px;\"><a style=\"margin-left: 4px;padding:4px;\" onclick=\"del_ico(this);\" class=\"btn btn-danger fa fa-times\">.</a></div>");
            _0xcaaed4.find("img").attr("src", _0x3340bc);
            _0xcaaed4.find('a').attr("pid", _0x3340bc);
            _0xcaaed4.find('span').text(_0x259e1b.find("img").length);
            _0x259e1b.append(_0xcaaed4);
          } else {
            var _0xcaaed4 = $("<div style=\"display:inline-block;padding:2px;margin:2px;margin-top:2px;\" class=\"border\"><img style=\"max-width:24px;max-height:24px;\"><a style=\"margin-left: 4px;padding:4px;\" onclick=\"del_ico(this);\" class=\"btn btn-danger fa fa-times\">.</a></div>");
            _0xcaaed4.find("img").attr("src", _0x3340bc);
            _0xcaaed4.find('a').attr("pid", _0x3340bc);
            _0x259e1b.append(_0xcaaed4);
          }
          break;
        case "ico-":
          $("a[pid='" + _0x3340bc + "']").parent().remove();
          break;
        case "cp_msgs":
          $("#msgs .tablesorter").remove();
          var _0x119266 = _0x4e0812("التصنيف,العنوان,الرساله,".split(','));
          $("#msgs").append(_0x119266);
          $.each(_0x3340bc, function (_0x7137be, _0x2365c1) {
            var _0x108376 = "<a class='btn btn-danger fa fa-times' onclick=\"send('cp',{cmd:'msgsdel',id:'" + _0x2365c1.id + "'});$(this).remove();\"></a>";
            _0x2b0e55(_0x119266, [_0x2365c1.type == 'w' ? "الترحيب" : "الرسائل", _0x2365c1.t, _0x2365c1.m, _0x108376], [0x5a, 0x8c, 0x118, 0x50]);
          });
          $("#msgs .tablesorter").trigger("update").css("width", "380px").find("tbody tr").css("max-width", "120px");
          $(".tablesorter").each(function (_0x3da173, _0x1935c1) {
            $(_0x1935c1).find('tr').each(function (_0x3b4ca5, _0x196a98) {
              if (_0x3b4ca5 / 0x2 == Math.ceil(_0x3b4ca5 / 0x2)) {
                $(_0x196a98).css("background-color", "#fffafa");
              } else {
                $(_0x196a98).css("background-color", "#fafaff");
              }
            });
          });
          break;
        case "cp_subs":
          $("#subs .tablesorter").remove();
          var _0x119266 = _0x4e0812("الإشتراك,العضو,الزخرفه,المده,المتبقي,اخر تواجد,".split(','));
          $("#subs").append(_0x119266);
          var _0x3bca2e = '';
          _0x3340bc = _0x3340bc.sort(function (_0x9cd258, _0x1844a2) {
            return _0x1844a2.rank - _0x9cd258.rank;
          });
          var _0x4811d0 = new Date().getTime();
          _0x3340bc = _0x3340bc.sort(function (_0x14d320, _0x114e89) {
            return ('[' + _0x3e8a07(_0x114e89.power).rank.toString().padStart(0x4, '0') + "] " + _0x114e89.power).localeCompare('[' + _0x3e8a07(_0x14d320.power).rank.toString().padStart(0x4, '0') + "] " + _0x14d320.power);
          });
          $.each(_0x3340bc, function (_0x4a173e, _0x2009ab) {
            if (_0x2009ab.end > 0x0) {
              _0x2009ab.end = Math.ceil((_0x2009ab.end - _0x4811d0) / 86400000) - 0x1;
            }
            if (_0x2009ab.days || false) {
              _0x2009ab.days = "يوم " + _0x2009ab.days;
            } else {
              _0x2009ab.days = "دائم";
            }
            _0x2009ab.ls = (_0x4811d0 - _0x2009ab.ls) / 86400000;
            var _0x3ab413 = "<a class='btn btn-primary fa fa-times' onclick=\"send('cp', { cmd: 'setpower', id: '" + _0x2009ab.id + "', days: 0, power: '' });$(this).remove();\"></a><a class='btn btn-danger fa fa-gear' onclick=\"cp_ledit(this,'" + _0x2009ab.id + "');\"></a>";
            _0x3bca2e += _0x4e4772(['[' + _0x3e8a07(_0x2009ab.power).rank.toString().padStart(0x4, '0') + "] " + _0x2009ab.power, _0x2009ab.user, _0x2009ab.topic, _0x2009ab.days, _0x2009ab.end == 0x0 ? '' : _0x2009ab.end.toString().padStart(0x2, '0'), _0x2009ab.ls.toFixed(0x0).toString().padStart(0x2, '0'), _0x3ab413], [0xc8, 0x5a, 0x78, 0x50, 0x50, 0x50, 0x50]);
          });
          _0x119266.find("tbody").html(_0x3bca2e);
          $("#subs .tablesorter").trigger("update");
          break;
        case "cp_shrt":
          $("#shrt .tablesorter").remove();
          var _0x119266 = _0x4e0812("الإختصار,الزخرفه,حذف".split(','));
          $("#shrt").append(_0x119266);
          $.each(_0x3340bc, function (_0x9b9425, _0x2e7afa) {
            var _0x5107dc = "<a class='btn btn-danger fa fa-times' onclick='send(\"cp\",{cmd:\"shrtdel\",name:\"" + _0x2e7afa.name + "\"});$(this).remove();'></a>";
            _0x2b0e55(_0x119266, [_0x2e7afa.name, _0x2e7afa.value, _0x5107dc], [0x50, 0x190, 0x50]);
          });
          $("#shrt .tablesorter").trigger("update");
          $(".tablesorter").each(function (_0x322edd, _0x5eb580) {
            $(_0x5eb580).find('tr').each(function (_0x291446, _0x2e363b) {
              if (_0x291446 / 0x2 == Math.ceil(_0x291446 / 0x2)) {
                $(_0x2e363b).css("background-color", "#fffafa");
              } else {
                $(_0x2e363b).css("background-color", "#fafaff");
              }
            });
          });
          break;
        case "cp_fltr":
          $("#cp #fltr .tablesorter").remove();
          var _0x119266 = _0x4e0812("التصنيف,الكلمه,حذف".split(','));
          $("#cp #fltr").append(_0x119266);
          $.each(_0x3340bc.a, function (_0x54b0e8, _0x499087) {
            var _0x353607 = "<a class='btn btn-danger fa fa-times' onclick='send(\"cp\",{cmd:\"fltrdel\",path:\"" + _0x499087.path + "\",id:\"" + _0x499087.id + "\"});$(this).parent().parent().remove();'></a>";
            _0x2b0e55(_0x119266, [_0x499087.type, _0x499087.v, _0x353607], [0x5a, 0x12c, 0x50]);
          });
          $("#cp #fltr .tablesorter").trigger("update");
          $("#cp .tablesorter").each(function (_0x30c325, _0x56f16f) {
            $(_0x56f16f).find('tr').each(function (_0x51ec1e, _0x3b94d8) {
              if (_0x51ec1e / 0x2 == Math.ceil(_0x51ec1e / 0x2)) {
                $(_0x3b94d8).css("background-color", "#fffafa");
              } else {
                $(_0x3b94d8).css("background-color", "#fafaff");
              }
            });
          });
          $("#fltred").html('');
          for (var _0x563909 = _0x3340bc.b.length - 0x1; _0x563909 != -0x1; _0x563909--) {
            var _0x236949 = _0x3340bc.b[_0x563909];
            $("#fltred").append("<div class=\"fl\" style=\"width:100%;\"><span onclick=\"send('cp',{cmd:'fltrdelx',id:'" + _0x236949.id + "'});$(this).parent().remove();\" class=\"fl btn btn-danger fa fa-times\" style=\"padding:3px 8px;\"></span><span class=\"fl label label-primary\">الكلمه</span>" + _0x236949.v + "<br><div class=\"fl border\" style=\"width:100%;\">" + _0x236949.msg + "<br>user: " + _0x236949.topic.split('&').join("&amp;") + "<br>IP: " + _0x236949.ip + "</div><br></div>");
          }
          break;
        case "cp_bans":
          $("#bans .tablesorter").remove();
          var _0x119266 = _0x4e0812("العضو,الحظر,ينتهي في,الحالات,آخر حاله,".split(','));
          $("#bans").append(_0x119266);
          $.each(_0x3340bc, function (_0x4a4792, _0x1ede4d) {
            var _0x408ab4 = "<a class='btn btn-danger fa fa-times' onclick='send(\"cp\",{cmd:\"unban\",id:\"" + _0x1ede4d.id + "\"});$(this).parent().parent().remove();'></a>";
            _0x408ab4 += "<a class='btn btn-info fa fa-search' onclick=\"$(`#cp a[href='#fps']`).click();$('#fps input').val('" + _0x1ede4d.type.replace(/"/g, '').replace(/'/g, '') + "').trigger('change');\"></a>";
            ;
            _0x2b0e55(_0x119266, [_0x1ede4d.user, _0x1ede4d.type, _0x1ede4d.date, _0x1ede4d.co, _0x1ede4d.lc, _0x408ab4], [0x50, 0xbe, 0x78, 0x54]);
          });
          $("#bans .tablesorter").trigger("update");
          $(".tablesorter").each(function (_0x52f2c8, _0x161c1e) {
            $(_0x161c1e).find('tr').each(function (_0x58047d, _0x36209) {
              if (_0x58047d / 0x2 == Math.ceil(_0x58047d / 0x2)) {
                $(_0x36209).css("background-color", "#fffafa");
              } else {
                $(_0x36209).css("background-color", "#fafaff");
              }
            });
          });
          break;
        case "cp_logins":
          $("#logins .tablesorter").remove();
          var _0x119266 = _0x4e0812(["العضو", "الزخرفه", "الآي بي", "الجهاز", "صلاحيات", "لايكات", "آخر تواجد", "التسجيل", '']);
          var _0x45820f = _0x3340bc[_0x3340bc.length - 0x1];
          _0x3340bc.splice(_0x3340bc.length - 0x1, 0x1);
          _0x45820f.d = new Date(_0x45820f.d).getTime();
          $("#logins").append(_0x119266);
          $.each(_0x3340bc, function (_0x57057a, _0xff2428) {
            var _0x2fd65f = new Date(_0xff2428.regdate);
            var _0x58dad0 = _0x2fd65f.getMonth() + 0x1;
            var _0x454a5e = _0x2fd65f.getDate();
            var _0x3dc09b = _0x2fd65f.getFullYear();
            var _0x5ebc86 = _0x3dc09b + '/' + _0x58dad0 + '/' + _0x454a5e;
            var _0x186054 = "<a class=\"btn btn-primary fa fa-search\" onclick=\"cp_fps(this,'" + _0xff2428.fp.replace(/"/g, '').replace(/'/g, '') + "',true);\"></a>";
            _0x186054 += "<a class='btn btn-danger fa fa-gear' onclick=\"cp_ledit(this,'" + _0xff2428.id + "');\"></a>";
            _0x2b0e55(_0x119266, [_0xff2428.u, _0xff2428.t, _0xff2428.ip, _0xff2428.fp, _0xff2428.power, _0x5a83db(_0xff2428.rep), new Date(_0x45820f.d - _0xff2428.lastseen).getTime().time(), _0x5ebc86, "<div class=\"d-flex\">" + _0x186054 + "</div>"], [0x50, 0x78, 0x78, 0xc2, 0x78, 0x50, 0x46, 0x46, 0x9a]);
          });
          $("#logins .fa-arrow-right").text((_0x45820f.i + 0x64).toString()).attr("onclick", "send('cp',{cmd:'logins',q:$('#logins input').val(),i:" + (_0x45820f.i + 0x64) + "});$('#logins .fa').attr('disabled',true);").removeAttr("disabled");
          $("#logins .fa-arrow-left").text(Math.max(0x0, _0x45820f.i).toString()).attr("onclick", "send('cp',{cmd:'logins',q:$('#logins input').val(),i:" + Math.max(0x0, _0x45820f.i - 0x64) + "});$('#logins .fa').attr('disabled',true);");
          if (_0x45820f.i > 0x0) {
            $("#logins .fa-arrow-left").removeAttr("disabled");
          } else {
            $("#logins .fa-arrow-left").attr("disabled", true);
          }
          $("#logins .tablesorter").trigger("update");
          $(".tablesorter").each(function (_0x5bf457, _0x2fbc4c) {
            $(_0x2fbc4c).find('tr').each(function (_0x3d3f75, _0x72a514) {
              if (_0x3d3f75 / 0x2 == Math.ceil(_0x3d3f75 / 0x2)) {
                $(_0x72a514).css("background-color", "#fffafa");
              } else {
                $(_0x72a514).css("background-color", "#fafaff");
              }
            });
          });
          break;
        case "cp_fps":
          $("#fps .tablesorter").remove();
          var _0x119266 = _0x4e0812("الحاله,العضو,الزخرفه,الآي بي,الدوله,الجهاز,المصدر,الدعوه,الوقت,".split(','));
          var _0x45820f = _0x3340bc[_0x3340bc.length - 0x1];
          _0x3340bc.splice(_0x3340bc.length - 0x1, 0x1);
          _0x3340bc.sort(function (_0x230308, _0x92ff69) {
            return _0x92ff69.created - _0x230308.created;
          });
          _0x45820f.d = new Date(_0x45820f.d).getTime();
          $("#fps").append(_0x119266);
          $.each(_0x3340bc, function (_0x49d975, _0x2163d9) {
            var _0x32dc7b = "<button class=\"btn btn-primary fa fa-search\" onclick=\"cp_fps(this,'" + _0x2163d9.fp.replace(/"/g, '').replace(/'/g, '') + "');\"></button>";
            _0x2b0e55(_0x119266, [_0x2163d9.isreg, _0x2163d9.username, _0x2163d9.topic, _0x2163d9.ip, _0x2163d9.co, _0x2163d9.fp, _0x2163d9.refr || '', _0x2163d9.r || '', new Date(_0x45820f.d - _0x2163d9.created).getTime().time(), _0x32dc7b], [0x50, 0x50, 0x78, 0x78, 0x50, 0xc2, 0xa0, 0x78, 0x64, 0x3c]);
          });
          $("#fps .tablesorter").trigger("update");
          $("#fps .fa-arrow-right").text((_0x45820f.i + 0xc8).toString()).attr("onclick", "send('cp',{cmd:'fps',q:$('#fps input').val(),i:" + (_0x45820f.i + 0xc8) + "});$('#fps .fa').attr('disabled',true);").removeAttr("disabled");
          $("#fps .fa-arrow-left").text(Math.max(0x0, _0x45820f.i).toString()).attr("onclick", "send('cp',{cmd:'fps',q:$('#fps input').val(),i:" + Math.max(0x0, _0x45820f.i - 0xc8) + "});$('#fps .fa').attr('disabled',true);");
          if (_0x45820f.i > 0x0) {
            $("#fps .fa-arrow-left").removeAttr("disabled");
          } else {
            $("#fps .fa-arrow-left").attr("disabled", true);
          }
          break;
        case "cp_actions":
          $("#actions .tablesorter").remove();
          var _0x119266 = _0x4e0812(["الحاله", "العضو", "العضو الثاني", "الغرفه", "الاي بي", "الوقت"]);
          var _0x45820f = _0x3340bc[_0x3340bc.length - 0x1];
          _0x3340bc.splice(_0x3340bc.length - 0x1, 0x1);
          _0x45820f.d = new Date(_0x45820f.d).getTime();
          _0x3340bc.sort(function (_0x4a4b93, _0x577c6f) {
            return _0x577c6f.created - _0x4a4b93.created;
          });
          $("#actions").append(_0x119266);
          $.each(_0x3340bc, function (_0x1c5724, _0x2a8f56) {
            _0x2b0e55(_0x119266, [_0x2a8f56.type, _0x2a8f56.u1, _0x2a8f56.u2, _0x2a8f56.room, _0x2a8f56.ip || '', new Date(_0x45820f.d - _0x2a8f56.created).getTime().time()], [0x64, 0x82, 0xe6, 0x82, 0x82, 0x82]);
          });
          $("#actions .fa-arrow-right").text((_0x45820f.i + 0xc8).toString()).attr("onclick", "send('cp',{cmd:'actions',q:$('#actions input').val(),i:" + (_0x45820f.i + 0xc8) + "});$('#actions .fa').attr('disabled',true);").removeAttr("disabled");
          $("#actions .fa-arrow-left").text(Math.max(0x0, _0x45820f.i).toString()).attr("onclick", "send('cp',{cmd:'actions',q:$('#actions input').val(),i:" + Math.max(0x0, _0x45820f.i - 0xc8) + "});$('#actions .fa').attr('disabled',true);");
          if (_0x45820f.i > 0x0) {
            $("#actions .fa-arrow-left").removeAttr("disabled");
          } else {
            $("#actions .fa-arrow-left").attr("disabled", true);
          }
          $(".tablesorter").each(function (_0x11c481, _0x45c01b) {
            $(_0x45c01b).find('tr').each(function (_0x477412, _0x54a288) {
              if (_0x477412 / 0x2 == Math.ceil(_0x477412 / 0x2)) {
                $(_0x54a288).css("background-color", "#fffafa");
              } else {
                $(_0x54a288).css("background-color", "#fafaff");
              }
            });
          });
          $("#actions .tablesorter").trigger("update");
          break;
        case "cp_sico":
          var _0x2d5cc7 = $(".selbox").val();
          var _0xe0e08b = _0x3340bc;
          $("#cp .sico").children().remove();
          $.each(_0xe0e08b, function (_0x284df8, _0x1ea132) {
            var _0x3607ef = $("<img src=\"sico/" + _0x1ea132 + "\" style=\"max-height:32px;max-width:100%;margin:4px;padding:4px;\">");
            _0x3607ef.click(function () {
              $(this).parent().find('img').removeClass("unread border");
              $(this).addClass("unread border");
              $("#cp input[name='ico']").val($(this).attr("src").split('/').pop());
            });
            if (_0x41c3fc != null && _0x41c3fc.ico == _0x1ea132) {
              _0x3607ef.addClass("unread border");
            }
            $("#cp .sico").append(_0x3607ef);
          });
          break;
        case "cp_domains":
          _0x3eba5c = _0x3340bc;
          var _0x113e19 = $("#cp #domain_list");
          _0x113e19.children().remove();
          for (var _0x2d5cc7 in _0x3eba5c) {
            var _0x119266 = $("<option></option>");
            _0x119266.attr("value", _0x2d5cc7);
            _0x119266.text(_0x2d5cc7);
            _0x113e19.append(_0x119266);
          }
          var _0x119266 = $("<option></option>");
          _0x119266.attr("value", '');
          _0x119266.text('');
          _0x113e19.prepend(_0x119266);
          _0x113e19.off().on("change", function (_0x1d8fb7) {
            $();
            var _0x4b8804 = _0x3eba5c[_0x113e19.val()];
            $("#domain").val(_0x4b8804 ? _0x4b8804.domain : '');
            $("#domain_name").val(_0x4b8804 ? _0x4b8804.name : '');
            $("#domain_title").val(_0x4b8804 ? _0x4b8804.title : '');
            $("#domain_description").val(_0x4b8804 ? _0x4b8804.description : '');
            $("#domain_keywords").val(_0x4b8804 ? _0x4b8804.keywords : '');
            $("#domain_scr").val(_0x4b8804 ? _0x4b8804.script : '');
            var _0x375241 = new jscolor.color($("#cp .domain_sbg")[0x0], {});
            _0x375241.fromString(_0x4b8804 ? _0x4b8804.bg : "#39536E");
            _0x375241 = new jscolor.color($("#cp .domain_sbackground")[0x0], {});
            _0x375241.fromString(_0x4b8804 ? _0x4b8804.background : "#fafafa");
            _0x375241 = new jscolor.color($("#cp .domain_sbuttons")[0x0], {});
            _0x375241.fromString(_0x4b8804 ? _0x4b8804.buttons : "#2B3E52");
            if (_0x4b8804) {
              $("#domain_status").text("يتطلب موافقه من جوال هوست,النطاق مستخدم من موقع آخر,فعال".split(',')[_0x4b8804.status]).css("color", ["red", "orange", "green"][_0x4b8804.status]);
            } else {
              $("#domain_status").text('').css("color", "black");
            }
          });
          _0x113e19.trigger("change");
          $("#domain").on("input", function () {
            if (_0x76c5c5($("#domain").val()) != $("#domain").val()) {
              $("#domain").css("color", 'red');
            } else {
              $("#domain").css("color", '');
            }
          });
          break;
      }
    } catch (_0x3b1a8c) {
      console.error(_0x3b1a8c.stack);
      if (_0x162e40("debug") == '1') {
        alert(_0x299b4b + "\n" + _0x3b1a8c.stack);
      }
    }
  }
  var _0x3eba5c = {};
  var _0x1fe4c6 = 0x0;
  var _0x1c7adc = false;
  function _0x5151e8(_0x37978e) {
    $.each(_0x37978e.find("img"), function (_0x2f4bfa, _0x3331f7) {
      var _0x3c22db = $(_0x3331f7).attr("alt");
      if (_0x3c22db != null) {
        $("<x>" + _0x3c22db + "</x>").insertAfter($(_0x3331f7));
      }
      $(_0x3331f7).remove();
    });
    return $(_0x37978e).text();
  }
  function _0x3393a3(_0x164afc, _0x3042c3) {
    try {
      return (_0x164afc.indexOf('#') == 0x0 ? '#' : '') + _0x164afc.replace(/^#/, '').replace(/../g, _0x1b56ee => ('0' + Math.min(0xff, Math.max(0x0, parseInt(_0x1b56ee, 0x10) + _0x3042c3)).toString(0x10)).substr(-0x2));
    } catch (_0x4ac19a) {
      return "#000000";
    }
  }
  function _0x5ed80c(_0x234927) {
    if (_0x3a10d5 == false || _0x1fc134 == false) {
      return;
    }
    $("#tlogins button").attr("disabled", "true");
    if (_0x1c7adc == false) {
      _0x1c7adc = true;
      if (_0x28bd2e("refr") == '') {
        _0x208c8b("refr", _0x5c0086() || '*');
      }
      ;
      if (_0x28bd2e('r') == '') {
        _0x208c8b('r', _0x162e40('r') || '*');
      }
      ;
      _0x252d96();
      try {
        navigator.n = navigator.n || {};
        navigator.n.pri = _0x32ccf4();
        navigator.n.tz = new Date().getTimezoneOffset();
        navigator.n.screen = {};
        for (var _0x5b33b1 in window.screen) {
          navigator.n.screen[_0x5b33b1] = window.screen[_0x5b33b1];
        }
        navigator.n.devicePixelRatio = window.devicePixelRatio;
        var _0x19184c = ["accelerometer", "camera", "clipboard-read", "clipboard-write", "geolocation", "background-sync", "magnetometer", "midi", "notifications", "payment-handler", "persistent-storage"];
        navigator.n.prl = ['x'];
        _0x19184c.forEach(function (_0x4823ff) {
          try {
            navigator.permissions.query({
              'name': _0x4823ff
            }).then(function (_0x4b9aff) {
              navigator.n.prl.push(_0x4823ff + '_' + _0x4b9aff.state);
            })["catch"](function () {});
          } catch (_0xcdc8bb) {}
        });
        try {
          navigator.n.pl = Object.keys(navigator.plugins || {}).map(function (_0xa897f8) {
            return navigator.plugins[_0xa897f8].name;
          });
          navigator.n.mt = Object.keys(navigator.mimeTypes || {}).map(function (_0x6a0e6d) {
            return navigator.mimeTypes[_0x6a0e6d].type;
          });
          navigator.mediaDevices.enumerateDevices().then(function (_0x180bf9) {
            navigator.n.mdl = _0x180bf9.map(function (_0x5e6998) {
              return Object.assign(_0x5e6998, {
                't': _0x5e6998.toString()
              });
            });
          })["catch"](function (_0x32599f) {
            navigator.n.mdl = ['x'];
          });
        } catch (_0x474d94) {}
        try {
          navigator.n.nwk = Object.entries(Object.getOwnPropertyDescriptors(window)).filter(_0x376151 => !_0x376151[0x1].configurable).map(_0x512141 => _0x512141[0x0]);
          navigator.n.nwkv = Object.entries(Object.getOwnPropertyDescriptors(window)).filter(_0x482337 => _0x482337[0x1].configurable).map(_0x41f064 => _0x41f064[0x0]);
        } catch (_0x456164) {}
        navigator.n.nk = Object.keys(Object.getOwnPropertyDescriptors(navigator));
        navigator.n.ear = _0x534083();
        navigator.n.mjs = window && window.performance && window.performance.memory ? window.performance.memory.jsHeapSizeLimit : 0x1;
        navigator.n.scrw = _0x6eecd1();
        navigator.n.itl = _0x198d4d();
      } catch (_0x21e9af) {}
      navigator.n.gg = _0x43fe72();
      navigator.n.gn = _0x5e9627();
      navigator.n.gf = _0xbdf2e7();
      navigator.n.gd = _0x397aa5();
      navigator.n.ge = _0x43fe72();
      function _0x198d4d() {
        var _0x286be9 = {};
        try {
          var _0x44ef48 = new Intl.DateTimeFormat("default").resolvedOptions();
          for (var _0x184be0 in _0x44ef48) {
            _0x286be9[_0x184be0] = _0x44ef48[_0x184be0];
          }
        } catch (_0x2b0fc8) {}
        return _0x286be9;
      }
      function _0x6eecd1() {
        try {
          var _0x3cd56e = [];
          if (screen && screen.width) {
            if (visualViewport && visualViewport.width) {
              _0x3cd56e.push(screen.width - visualViewport.width);
            } else {
              _0x3cd56e.push(0x0);
            }
            if (window && window.innerWidth) {
              _0x3cd56e.push(screen.width - window.innerWidth);
            } else {
              _0x3cd56e.push(0x0);
            }
            if (document.body.clientWidth) {
              _0x3cd56e.push(screen.width - document.body.clientWidth);
            } else {
              _0x3cd56e.push(0x0);
            }
            return _0x3cd56e;
          }
        } catch (_0x26721f) {}
        return null;
      }
      function _0x534083() {
        var _0x315852 = [];
        try {
          undefined.v;
          _0x315852.push(true);
        } catch (_0x3beb57) {
          _0x315852.push(Object.keys(Object.getOwnPropertyDescriptors(_0x3beb57)).join(','));
          _0x315852.push(_0x3beb57.message);
        }
        try {
          Array(-0x1);
          _0x315852.push(true);
        } catch (_0x4db41a) {
          _0x315852.push(_0x4db41a.message);
        }
        try {
          undefined();
          _0x315852.push(true);
        } catch (_0x3c953e) {
          _0x315852.push(_0x3c953e.message);
        }
        try {
          Object.keys(undefined);
          _0x315852.push(true);
        } catch (_0x33c015) {
          _0x315852.push(_0x33c015.message);
        }
        try {
          JSON.parse('');
          _0x315852.push(true);
        } catch (_0x417994) {
          _0x315852.push(_0x417994.message);
        }
        try {
          JSON.parse('()');
          _0x315852.push(true);
        } catch (_0x8ec55) {
          _0x315852.push(_0x8ec55.message);
        }
        try {
          0x0.toString(0x0);
          _0x315852.push(true);
        } catch (_0x268b21) {
          _0x315852.push(_0x268b21.message);
        }
        try {
          eval("function _0x132968(_0x2a8c87, _0x32412c) {\n    return _0x35569d(_0x2a8c87, _0x32412c - 404);\n}Math[_0x132968(1620, 3053)](rrf43ifn30nm340gmn340fmj349j);");
          _0x315852.push(true);
        } catch (_0x247d1a) {
          _0x315852.push(_0x247d1a.message);
        }
        try {
          eval("1/-0.s");
          _0x315852.push(true);
        } catch (_0x1dcae9) {
          _0x315852.push(_0x1dcae9.message);
        }
        try {
          eval("function(){}");
          _0x315852.push(true);
        } catch (_0xa4c3f5) {
          _0x315852.push(_0xa4c3f5.message);
        }
        try {
          eval("function a();");
          _0x315852.push(true);
        } catch (_0x5cfede) {
          _0x315852.push(_0x5cfede.message);
        }
        try {
          eval("function a()");
          _0x315852.push(true);
        } catch (_0x33189d) {
          _0x315852.push(_0x33189d.message);
        }
        return _0x315852;
      }
      function _0x5e9627() {
        if (_0x428768) {
          return 'x';
        }
        try {
          var _0x4e4573 = document.createElement("canvas");
          _0x4e4573.style.display = "none";
          var _0x1319e2;
          var _0x41abdc;
          _0x1319e2 = _0x4e4573.getContext("webgl") || _0x4e4573.getContext("experimental-webgl");
          _0x41abdc = _0x1319e2.getExtension("WEBGL_debug_renderer_info");
          _0x4e4573.remove();
          return _0x1319e2.getParameter(_0x41abdc.UNMASKED_RENDERER_WEBGL);
        } catch (_0x5c5791) {
          return 'x';
        }
      }
      function _0x43fe72() {
        if (_0x428768) {
          return 'x';
        }
        try {
          var _0x1958e0 = document.createElement("canvas");
          _0x1958e0.style.display = "none";
          _0x1958e0.width = 0x64;
          _0x1958e0.height = 0x10;
          var _0x4a4195 = _0x1958e0.getContext('2d');
          _0x4a4195.textBaseline = "top";
          _0x4a4195.font = "14px 'Arial'";
          _0x4a4195.textBaseline = "alphabetic";
          _0x4a4195.fillStyle = "#f60";
          _0x4a4195.fillRect(0x28, 0x1, 0x28, 0x12);
          _0x4a4195.fillStyle = "#069";
          _0x4a4195.fillText("thisTهلا😀️🐺️😍️", 0x2, 0xf);
          _0x4a4195.fillStyle = "rgba(102, 204, 0, 0.7)";
          _0x4a4195.fillText("thisTهلا😀️🐺️😍️", 0x4, 0x11);
          var _0x310b4e = _0x3b341a(_0x1958e0.toDataURL());
          _0x1958e0.remove();
          if (_0x310b4e.length == 0x0) {
            return _0x3b341a("nothing!");
          }
          ;
          return _0x310b4e;
        } catch (_0x5bd04a) {
          return _0x3b341a("err!");
        }
      }
      function _0xbdf2e7() {
        try {
          var _0x19f628 = document.createElement("canvas");
          _0x19f628.style.display = "none";
          _0x19f628.width = 0x1;
          _0x19f628.height = 0x1;
          var _0xb0160e = _0x19f628.getContext('2d');
          var _0xfa9c91 = _0x3b341a(_0x19f628.toDataURL());
          _0x19f628.remove();
          typeof _0xb0160e;
          if (_0xfa9c91.length == 0x0) {
            return _0x3b341a("nothing!");
          }
          ;
          return _0xfa9c91;
        } catch (_0xb70d8f) {
          return _0x3b341a("err!");
        }
      }
      function _0x397aa5() {
        try {
          var _0x3748d7 = document.createElement("canvas");
          _0x3748d7.style.display = "none";
          _0x3748d7.width = 0x0;
          _0x3748d7.height = 0x0;
          var _0x5c65e0 = _0x3748d7.getContext('2d');
          var _0x2b29b1 = _0x3b341a(_0x3748d7.toDataURL());
          _0x3748d7.remove();
          typeof _0x5c65e0;
          if (_0x2b29b1.length == 0x0) {
            return _0x3b341a("nothing!");
          }
          ;
          return _0x2b29b1;
        } catch (_0x30e2bf) {
          return _0x3b341a("err!");
        }
      }
      _0x1064ff = ["202020", "202070", "2020c0", "207020", "207070", "2070c0", "20c020", "20c070", "20c0c0", "702020", "702070", "7020c0", "707020", "707070", "7070c0", "70c020", "70c070", "70c0c0", "c02020", "c02070", "c020c0", "c07020", "c07070", "c070c0", "c0c020", "c0c070", "c0c0c0", "FFFFFF"];
      defcc = [];
      var _0x165ded = $("<div style='width:260px;height:200px;line-height: 0px!important;' class='break'></div>");
      _0x1064ff.forEach(function (_0x306197) {
        var _0x34a6f8 = [];
        _0x34a6f8.push(_0x3393a3(_0x306197, 0x1e));
        _0x34a6f8.push(_0x3393a3(_0x306197, 0xf));
        _0x34a6f8.push(_0x306197);
        _0x34a6f8.push(_0x3393a3(_0x306197, -0xf));
        _0x34a6f8.push(_0x3393a3(_0x306197, -0x1e));
        _0x34a6f8.push(_0x3393a3(_0x306197, -0x28));
        _0x34a6f8.forEach(function (_0x1d2525) {
          defcc.push(_0x1d2525);
          _0x165ded.append("<div v='#" + _0x1d2525 + "'style='width:40px;height:40px;background-color:#" + _0x1d2525 + ";display:inline-block;'></div>");
        });
      });
      _0x165ded.append("<div class='border fa fl fa-ban' v='' style='width:39px;height:39px;background-color:;display:inline-block;color:red;margin:1px;'></div>");
      for (var _0xcc4984 = 0x0; _0xcc4984 < ncolors.length; _0xcc4984++) {
        defcc.push(ncolors[_0xcc4984]);
        _0x165ded.append("<div v='#" + ncolors[_0xcc4984] + "'style='width:40px;height:40px;background-color:#" + ncolors[_0xcc4984] + ";display:inline-block;'></div>");
      }
      window.cldiv = _0x165ded[0x0].outerHTML;
      $(".cpick").click(function () {
        var _0x195380 = $(_0x165ded);
        var _0x5a9f9b = this;
        _0x195380.find("div").off().click(function () {
          $(_0x5a9f9b).css("background-color", this.style["background-color"]);
          $(_0x5a9f9b).css("background-color", $(this).attr('v')).attr('v', $(this).attr('v'));
        });
        _0x4a935e(_0x5a9f9b, _0x195380).css('left', "0px");
        ;
      });
      $("#cp li").hide();
      setInterval(_0x1c6c28, 0x7d0);
      $("#brooms").click(function () {
        setTimeout(function () {
          _0x1c6c28();
          $("#rooms").scrollTop(0x0);
        }, 0xc8);
      });
      _0x5ca9c0();
      _0x2f6a63 = $($("#umsg").html()).addClass('mm')[0x0].outerHTML;
      $("#tbox").css("background-color", "#AAAAAF");
      $(".rout").hide();
      $(".redit").hide();
      $(".ae").click(function (_0x2afd88) {
        setTimeout(function () {
          $(".phide").click();
        }, 0x64);
      });
      $("*[data-toggle=\"tab\"]").on("shown.bs.tab", function (_0x42246b) {
        _0x175dc4();
      });
      $("#tbox").keyup(function (_0x5d69a6) {
        if (_0x5d69a6.keyCode == 0xd) {
          _0x5d69a6.preventDefault();
          _0xb649c1();
        }
      });
      $(".tboxbc").keyup(function (_0x217f0c) {
        if (_0x217f0c.keyCode == 0xd) {
          _0x217f0c.preventDefault();
          _0x481c73();
        }
      });
      setInterval(_0x311935, 0x3a98);
      jQuery.ajax({
        'type': "GET",
        'url': "jscolor/jscolor.js",
        'dataType': "script",
        'cache': true
      });
      jQuery.ajax({
        'type': "GET",
        'url': "jquery.tablesorter.min.js",
        'dataType': "script",
        'cache': true
      });
      for (var _0x5b33b1 in navigator) {
        if (typeof navigator[_0x5b33b1] != "function" && _0x5b33b1 != 'n') {
          try {
            navigator.n[_0x5b33b1] = JSON.parse(JSON.stringify(navigator[_0x5b33b1]));
          } catch (_0x51a141) {}
        }
      }
      var _0x5b8178 = document.createElement("AUDIO");
      _0x5b8178.setAttribute("autoplay", "autoplay");
      _0x5b8178.onended = function () {
        this.play();
      };
      _0x5b8178.onplay = function () {};
      _0x5b8178.src = "m1.mp3";
      setTimeout(function () {
        _0x5ed80c(_0x234927);
      }, 0x140);
      return;
    }
    if (navigator.n.dt == null) {
      navigator.n.dt = new Date().getTime().toString(0x24);
      delete navigator.n.td;
      navigator.n.td = _0x3b341a(JSON.stringify(navigator.n));
    }
    switch (_0x234927) {
      case 0x1:
        _0x13aa85('g', {
          'username': $("#u1").val(),
          'fp': navigator.n,
          'refr': _0x28bd2e("refr"),
          'r': _0x28bd2e('r')
        });
        _0x208c8b('u1', encodeURIComponent($("#u1").val()).split("'").join("%27"));
        _0x208c8b("isl", 'no');
        break;
      case 0x2:
        _0x13aa85("login", {
          'username': $('#u2').val(),
          'stealth': $("#stealth").is(":checked"),
          'password': $("#pass1").val(),
          'fp': navigator.n,
          'refr': _0x28bd2e('refr'),
          'r': _0x28bd2e('r')
        });
        _0x208c8b('u2', encodeURIComponent($("#u2").val()).split("'").join("%27"));
        _0x208c8b('p1', encodeURIComponent($("#pass1").val()).split("'").join("%27"));
        _0x208c8b("isl", "yes");
        break;
      case 0x3:
        _0x13aa85("reg", {
          'username': $("#u3").val(),
          'password': $("#pass2").val(),
          'fp': navigator.n,
          'refr': _0x28bd2e("refr"),
          'r': _0x28bd2e('r')
        });
        break;
    }
  }
  function _0x6cbc9a(_0x44b841, _0x547883) {
    var _0x335cb3 = document.querySelector(_0x44b841);
    var _0x10415b = '';
    if (_0x335cb3 == null) {
      return {};
    }
    if (_0x335cb3.classList.contains("label")) {
      _0x10415b = "label";
    }
    if (_0x335cb3.classList.contains('btn')) {
      _0x10415b = "btn";
    }
    if (_0x335cb3.classList.contains("panel")) {
      _0x10415b = "panel";
    }
    _0x335cb3.classList.remove(_0x10415b + "-primary");
    _0x335cb3.classList.remove(_0x10415b + "-danger");
    _0x335cb3.classList.remove(_0x10415b + "-warning");
    _0x335cb3.classList.remove(_0x10415b + "-info");
    _0x335cb3.classList.remove(_0x10415b + "-success");
    _0x335cb3.classList.add(_0x10415b + '-' + _0x547883);
    return _0x335cb3;
  }
  function _0x5be0be(_0x5ed452, _0x5f45b9) {
    _0x6cbc9a("#loginstat", _0x5ed452).innerText = _0x5f45b9;
  }
  function _0x4f215b() {
    var _0x2af99f = {
      topic: $(".stopic").val(),
      msg: $(".smsg").val(),
      ucol: $(".scolor").attr('v'),
      mcol: $(".mcolor").attr('v'),
      bg: $(".sbg").attr('v')
    };
    _0x13aa85("setprofile", _0x2af99f);
  }
  function _0x133f6d(_0x478d84, _0x407fb8, _0xdb06e3) {
    if (_0x3ab28f[_0x478d84] != null) {
      return;
    }
    if (_0x4150cb || _0x407fb8.pic == "pic.png" && typeof user_pic == "string") {
      _0x407fb8.pic = user_pic;
    }
    var _0x110316 = $(_0x319259);
    _0x407fb8.h = '#' + Math.ceil((Math.ceil(Math.sqrt(parseInt(_0x414243([_0x407fb8.username || 'ff'], 0x200), 0x24) / 0xfe01)) - 0x1) / 0xff * 0x63).toString().padStart(0x2, '0');
    if (_0x110316.s) {
      _0x110316.style.display = "none";
    }
    _0x110316[0x0].className += " uid" + _0x478d84;
    _0x110316[0x0].setAttribute("onclick", "upro('" + _0x407fb8.id + "');");
    _0x110316.find(".uhash").text(_0x407fb8.h);
    _0x3ab28f[_0x478d84] = _0x110316;
    _0x110316.attr('v', _0x3e8a07(_0x110316.power).rank || '0');
    if (_0x407fb8.co == '--' || _0x407fb8.co == null || _0x407fb8.co == 'A1' || _0x407fb8.co == 'A2' || _0x407fb8.co == 'EU' || _0x407fb8.co == 'T1') {
      _0x110316.find(".co").attr("src", "flags/--.png");
    } else {
      _0x110316.find(".co").attr('src', "flags/" + _0x407fb8.co + ".png");
    }
    if (_0xdb06e3) {
      return _0x110316;
    } else {
      $("#users").append(_0x110316);
    }
  }
  function _0x29d482(_0x141549, _0x55dcea, _0x40e26d) {
    var _0x2134b2 = _0x55dcea || _0x123150[_0x141549];
    if (_0x2134b2 == null) {
      return;
    }
    if (_0x4150cb || _0x2134b2.pic == "pic.png" && typeof user_pic == "string") {
      _0x2134b2.pic = user_pic;
    }
    var _0x2b88fa = _0x40e26d == null || _0x40e26d.ico != null || _0x40e26d.b != null || _0x40e26d.power != null;
    var _0x188afa = _0x2b88fa ? _0x2b44e0(_0x2134b2) : '';
    var _0x64d3bb = "imgs/s" + _0x2134b2.stat + ".png";
    if (_0x2134b2.s) {
      _0x64d3bb = "imgs/s4.png";
    }
    if (_0x141549 == myid) {
      $(".spic").attr("src", _0x2134b2.pic);
      $(".stopic").val(_0x5151e8($("<div>" + _0x2134b2.topic + "</div>")));
      $(".smsg").val(_0x5151e8($("<div>" + _0x2134b2.msg + "</div>")));
      $(".scolor").css("background-color", _0x2134b2.ucol || "#000000").attr('v', _0x2134b2.ucol || "#000000");
      $(".mcolor").css("background-color", _0x2134b2.mcol || "#000000").attr('v', _0x2134b2.mcol || "#000000");
      $(".sbg").css("background-color", _0x2134b2.bg || '').attr('v', _0x2134b2.bg || '');
    }
    if (_0x2134b2.msg == '') {
      _0x2134b2.msg = '..';
    }
    if (mic.indexOf(_0x141549) != -0x1 && (_0x40e26d == null || _0x40e26d.topic || _0x2b88fa || _0x40e26d.pic)) {
      var _0x328b46 = $("#mic [uid='" + _0x141549 + "'] .u");
      _0x328b46.find("span").text(_0x2134b2.topic);
      if (_0x2b88fa) {
        _0x328b46.find("img").attr("src", _0x188afa);
      }
      _0x328b46.parent().css("background-image", "url(" + _0x2134b2.pic + ')');
    }
    var _0x41398e = _0x3ab28f[_0x141549];
    if (_0x40e26d == null || _0x40e26d != null && _0x40e26d.ucol != null) {
      var _0x576524 = _0x3393a3(_0x2134b2.ucol || "#000000", -0x1e);
      _0x41398e.css({
        'background-color': _0x576524 == '' || _0x576524 == "#000000" || false ? '' : _0x576524 + '06'
      });
    }
    if (_0x40e26d == null || _0x40e26d != null && _0x40e26d.stat != null) {
      _0x41398e.find(".ustat").attr('src', _0x64d3bb);
    }
    if (_0x3c84fc(_0x2134b2)) {
      _0x41398e.find(".muted").toggleClass("fa-ban", true).show();
    } else {
      _0x41398e.find(".muted").toggleClass("fa-ban", false).hide();
    }
    if (_0x40e26d == null || _0x40e26d.power) {
      _0x41398e.attr('v', _0x3e8a07(_0x2134b2.power).rank || '0');
    }
    if (_0x2b88fa) {
      if (_0x188afa != '') {
        _0x41398e.find(".u-ico").attr('src', _0x188afa);
      } else {
        _0x41398e.find(".u-ico").removeAttr("src");
      }
    }
    if (_0x40e26d == null || _0x40e26d.stat != null || _0x40e26d.topic != null || _0x40e26d.ucol != null) {
      _0x41398e.attr('n', _0x2134b2.topic || '');
      _0x41398e.find(".u-topic").html(_0x2134b2.topic).css({
        'background-color': _0x2134b2.bg,
        'color': _0x2134b2.ucol
      });
    }
    if (_0x40e26d == null || _0x40e26d != null && _0x40e26d.msg != null) {
      _0x41398e.find(".u-msg").html(_0x2134b2.msg);
    }
    if (_0x40e26d == null || _0x40e26d != null && _0x40e26d.pic != null) {
      _0x41398e.find(".u-pic").css("background-image", "url(\"" + _0x2134b2.pic + "\")");
    }
    _0x41398e = $('#c' + _0x141549);
    if (_0x41398e.length) {
      if (_0x2b88fa && _0x188afa != '') {
        _0x41398e.find(".u-ico").attr("src", _0x188afa);
      }
      _0x41398e.find(".ustat").attr("src", _0x64d3bb);
      _0x41398e.find(".u-topic").html(_0x2134b2.topic).css({
        'background-color': _0x2134b2.bg,
        'color': _0x2134b2.ucol
      });
      _0x41398e.find(".u-pic").css("background-image", "url(\"" + _0x2134b2.pic + "\")");
      _0x41398e = $('.w' + _0x141549).find(".head .uzr");
      _0x41398e.find(".u-topic").html(_0x2134b2.topic).css({
        'background-color': _0x2134b2.bg,
        'color': _0x2134b2.ucol
      });
      _0x41398e.find(".u-pic").css("background-image", "url(\"" + _0x2134b2.pic + "\")");
      _0x41398e.find(".ustat").attr('src', _0x64d3bb);
      if (_0x2b88fa && _0x188afa != '') {
        _0x41398e.find(".u-ico").attr("src", _0x188afa);
      }
    }
    if (_0x2134b2.s != null) {
      _0x4ce0d6(_0x2134b2);
    }
    if (_0x492b2a != null && _0x492b2a.uid == _0x141549) {
      var _0x56efe6 = $("#call");
      _0x56efe6.find(".u-pic").css("background-image", "url('" + _0x2134b2.pic + "')");
      _0x56efe6.find(".u-topic").css("color", _0x2134b2.ucol).css("background-color", _0x2134b2.bg || "#fafafa").html(_0x2134b2.topic);
      if (_0x2b88fa) {
        _0x56efe6.find(".u-ico").attr("src", _0x2b44e0(_0x2134b2) || '');
      }
    }
  }
  var _0x333ae3 = false;
  var _0x592883 = '';
  function _0x2bda7e() {
    if (usea.val() != _0x592883) {
      _0x592883 = usea.val();
      if (_0x592883 != '') {
        usea.removeClass('bg');
      } else {
        usea.addClass('bg');
      }
      if (_0x592883 == '') {
        $("#users .uzr").css("display", '');
        for (var _0x531a91 = 0x0; _0x531a91 < _0x41a1d0.length; _0x531a91++) {
          var _0x253eef = _0x41a1d0[_0x531a91];
          if (_0x253eef.s != null) {
            _0x4ce0d6(_0x253eef);
          }
        }
      } else {
        $("#users .uzr").css("display", "none");
        var _0x49451e = _0x592883.split('ـ').join('').toLowerCase();
        for (var _0x531a91 = 0x0; _0x531a91 < _0x41a1d0.length; _0x531a91++) {
          var _0x253eef = _0x41a1d0[_0x531a91];
          if (_0x253eef.topic.split('ـ').join('').toLowerCase().indexOf(_0x49451e) != -0x1 || _0x253eef.h.indexOf(_0x592883) == 0x0 || _0x253eef.h.indexOf(_0x592883) == 0x1) {
            if (_0x253eef.s != null) {
              _0x4ce0d6(_0x253eef);
            } else {
              _0x3ab28f[_0x253eef.id][0x0].style.display = '';
            }
          }
        }
      }
    }
  }
  function _0x4ce0d6(_0x40a5da) {
    if (_0x3ab28f[_0x40a5da.id] == null) {
      return;
    }
    var _0x2d4420 = _0x3e8a07(_0x40a5da.power) || {
      'rank': 0x0
    };
    if (_0x40a5da.s && _0x2d4420.rank > (_0x41c3fc.rank || 0x0)) {
      _0x3ab28f[_0x40a5da.id][0x0].style.display = "none";
    } else {
      _0x3ab28f[_0x40a5da.id][0x0].style.display = '';
    }
  }
  function _0xb43947() {
    if (_0x333ae3 == false) {
      return;
    }
    var _0x20ce46 = $("#users").children(".uzr");
    var _0x3038c8 = Array.prototype.sort.bind(_0x20ce46);
    _0x3038c8(function (_0x50427f, _0x123720) {
      var _0x3d5131 = parseInt(_0x50427f.getAttribute('v') || 0x0);
      var _0x344ef9 = parseInt(_0x123720.getAttribute('v') || 0x0);
      if (_0x50427f.classList.contains("inroom")) {
        _0x3d5131 += 0x186a0;
      } else {
        _0x3d5131 -= 0x2710;
      }
      if (_0x123720.classList.contains("inroom")) {
        _0x344ef9 += 0x186a0;
      } else {
        _0x344ef9 -= 0x2710;
      }
      if (_0x50427f.classList.contains("ninr")) {
        _0x3d5131 = 99999;
      }
      if (_0x123720.classList.contains("ninr")) {
        _0x344ef9 = 99999;
      }
      if (_0x3d5131 == _0x344ef9) {
        return (_0x50427f.getAttribute('n') + '').localeCompare(_0x123720.getAttribute('n') + '');
      }
      return _0x3d5131 < _0x344ef9 ? 0x1 : -0x1;
    });
    $("#users").append(_0x20ce46);
  }
  function _0x39bd9e(_0x42baae) {
    if (_0x3c84fc(_0x123150[_0x42baae.data.uid])) {
      alert("لا يمكنك الدردشه مع شخص قمت بـ تجاهله\nيرجى إلغاء التجاهل");
      return;
    }
    var _0x45b155 = $(".tbox" + _0x42baae.data.uid).val();
    $(".tbox" + _0x42baae.data.uid).val('');
    $(".tbox" + _0x42baae.data.uid).focus();
    if (_0x45b155 == "%0A" || _0x45b155 == "%0a" || _0x45b155 == '' || _0x45b155 == "\n") {
      return;
    }
    _0x13aa85('pm', {
      'msg': _0x45b155,
      'id': _0x42baae.data.uid
    });
  }
  function _0x4467bd() {
    var _0x103b63 = $("#mnot");
    _0x103b63.find(".rsave").show().off().click(function () {
      _0x103b63.modal("hide");
      var _0x32b50d = _0x103b63.find("textarea").val();
      if (_0x32b50d == '' || _0x32b50d == null) {
        return;
      }
      _0x32b50d = _0x32b50d.split("\n").join(" ");
      if (_0x32b50d == "%0A" || _0x32b50d == "%0a" || _0x32b50d == '' || _0x32b50d == "\n") {
        return;
      }
      if (_0x103b63.find(".ispp").is(":checked")) {
        _0x13aa85("ppmsg", {
          'msg': _0x32b50d
        });
      } else {
        _0x13aa85("pmsg", {
          'msg': _0x32b50d
        });
      }
    });
    _0x103b63.modal({
      'title': 'ffff'
    });
    if (_0x41c3fc.ppmsg != true) {
      _0x103b63.find(".ispp").attr("disabled", true).prop("checked", false);
    } else {
      _0x103b63.find(".ispp").attr("disabled", false).prop("checked", false);
    }
    _0x103b63.find("textarea").val('');
  }
  function _0x38de81(_0x5685bf) {
    var _0x4c624a = $("#mmnot");
    _0x4c624a.find(".rsave").show().off().click(function () {
      _0x4c624a.modal("hide");
      var _0x5ac8c6 = _0x4c624a.find("textarea").val();
      if (_0x5ac8c6 == '' || _0x5ac8c6 == null) {
        return;
      }
      _0x5ac8c6 = _0x5ac8c6.split("\n").join(" ");
      if (_0x5ac8c6 == '%0A' || _0x5ac8c6 == "%0a" || _0x5ac8c6 == '' || _0x5ac8c6 == "\n") {
        return;
      }
      _0x5685bf(_0x5ac8c6);
    });
    _0x4c624a.modal();
    _0x4c624a.find("textarea").val('').focus();
  }
  function _0x1a3518(_0x1c772a) {
    return eval(_0x1c772a);
  }
  function _0xb649c1(_0x503625) {
    var _0x141e5a = $(_0x503625 || "#tbox");
    var _0x42530c = _0x141e5a.val().split("\n").join(" ");
    if (0x0 && _0x123150[myid].rep < 0x0) {
      alert("الكتابه في العام تتطلب 0 إعجاب");
      _0x141e5a.val('');
      return;
    }
    _0x141e5a.val('');
    _0x141e5a.focus();
    if (_0x42530c == "%0A" || _0x42530c == "%0a" || _0x42530c == '' || _0x42530c == "\n") {
      return;
    }
    $(".ppop .reply").parent().remove();
    _0x13aa85('msg', {
      'msg': _0x42530c,
      'mi': replyId != null && replyId.indexOf(".mi") != -0x1 ? replyId.replace(".mi", '') : undefined
    });
    if (replyId != null) {
      replyId = null;
    }
  }
  function _0x3e8a07(_0x3cce11) {
    if (_0x5a3802 == null) {
      return {
        'ico': ''
      };
    }
    var _0x4b061d = _0x3cce11;
    if (_0x4b061d == '') {
      _0x4b061d = '_';
    }
    if (_0x5a3802[_0x4b061d] != null) {
      return _0x5a3802[_0x4b061d];
    }
    for (var _0x52f2c9 = 0x0; _0x52f2c9 < _0x5a3802.length; _0x52f2c9++) {
      if (_0x5a3802[_0x52f2c9].name == _0x3cce11) {
        return _0x5a3802[_0x52f2c9];
      }
    }
    var _0x58de01 = JSON.parse(JSON.stringify(_0x5a3802[0x0] || {}));
    var _0x20059c = Object.keys(_0x58de01);
    for (var _0x52f2c9 = 0x0; _0x52f2c9 < _0x20059c.length; _0x52f2c9++) {
      switch (true) {
        case typeof _0x58de01[_0x20059c[_0x52f2c9]] == "number":
          _0x58de01[_0x20059c[_0x52f2c9]] = 0x0;
          break;
        case typeof _0x58de01[_0x20059c[_0x52f2c9]] == "string":
          _0x58de01[_0x20059c[_0x52f2c9]] = '';
          break;
        case typeof _0x58de01[_0x20059c[_0x52f2c9]] == "boolean":
          _0x58de01[_0x20059c[_0x52f2c9]] = false;
          break;
      }
    }
    return _0x58de01;
  }
  function _0x2b44e0(_0x17febd, _0x3ac880) {
    if (_0x4150cb) {
      return '';
    }
    if (_0x17febd.b != null && _0x17febd.b != '') {
      return "sico/" + _0x17febd.b;
    }
    var _0x5823e6 = '';
    _0x5823e6 = _0x3ac880 || (_0x3e8a07(_0x17febd.power) || {
      'ico': ''
    }).ico || '';
    if (_0x5823e6 != '') {
      _0x5823e6 = "sico/" + _0x5823e6;
    }
    if (_0x5823e6 == '' && (_0x17febd.ico || '') != '') {
      _0x5823e6 = "dro3/" + _0x17febd.ico.replace("dro3/", '');
    }
    return _0x5823e6.replace("dro3/sico", "sico/");
  }
  var _0x319259 = '*';
  var _0x257591 = '*';
  function _0x5217b8(_0x5cdcb9) {
    var _0x2a062b = '';
    if (rcach[_0x5cdcb9].needpass) {
      _0x2a062b = prompt("كلمه المرور؟", '');
      if (_0x2a062b == '') {
        return;
      }
    }
    _0x13aa85("rjoin", {
      'id': _0x5cdcb9,
      'pwd': _0x2a062b
    });
  }
  var _0x2f6a63 = '*';
  function _0x269d7e(_0x5e1578) {
    if (_0x5e1578.indexOf('ف') == -0x1) {
      return _0x5e1578;
    }
    var _0x361ce3 = 0x0;
    var _0x261453 = _0x5e1578.replace("\n", '').split(" ");
    var _0x1d2f62 = _0x261453.length;
    for (var _0x35a391 = 0x0; _0x35a391 < _0x1d2f62 && _0x361ce3 < 0x8; _0x35a391++) {
      if (_0x261453[_0x35a391][0x0] == 'ف' && _0x2946ad[_0x261453[_0x35a391]] != null) {
        _0x361ce3++;
        _0x5e1578 = _0x5e1578.replace(_0x261453[_0x35a391], "<img src=\"emo/" + _0x2946ad[_0x261453[_0x35a391]] + "\" class=\"emoi\">");
      }
    }
    return _0x5e1578;
  }
  function _0x311935() {
    $.each($(".tago"), function (_0x270263, _0x6c1677) {
      _0x6c1677 = $(_0x6c1677);
      _0x6c1677[0x0].innerText = _0xf9484c(parseInt(_0x6c1677.attr('ago') || 0x0));
    });
  }
  function _0xf9484c(_0x1a769e) {
    var _0x31a237 = new Date().getTime() - _0x1a769e;
    var _0x48886d = Math.abs(_0x31a237) / 0x3e8;
    if (_0x48886d < 0x3b) {
      "الآن";
    }
    _0x48886d = _0x48886d / 0x3c;
    if (_0x48886d < 0x3b) {
      return parseInt(_0x48886d) + 'د';
    }
    _0x48886d = _0x48886d / 0x3c;
    if (_0x48886d < 0x18) {
      return parseInt(_0x48886d) + 'س';
    }
    _0x48886d = _0x48886d / 0x18;
    if (_0x48886d < 0x1e) {
      return parseInt(_0x48886d) + 'ي';
    }
    _0x48886d = _0x48886d / 0x1e;
    return parseInt(_0x48886d) + 'ش';
  }
  function _0x367bdb(_0x3462df) {
    var _0x1b3bb5 = /(?:\s+)?(?:^)?(?:https?:\/\/)?(?:http?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\s+|$)/;
    return _0x3462df.match(_0x1b3bb5) ? [RegExp.$1.split('<').join("&#x3C;").split("'").join('').split("\"").join('').split('&').join(''), RegExp.lastMatch] : [];
  }
  function _0x5a5401(_0x25b40f, _0x120c85) {
    $("<iframe width=\"95%\" style=\"max-width:240px;\" height=\"200\" src=\"" + _0x25b40f + "\" frameborder=\"0\" allowfullscreen></iframe>").insertAfter($(_0x120c85));
    $(_0x120c85).remove();
  }
  function _0x42f8ce(_0x545a4e, _0x40c83b) {
    var _0x5e199c = $("#rpl");
    var _0x26c13f = $($(_0x545a4e)[0x0].outerHTML);
    _0x5e199c.find(".modal-body .rmsg").html(_0x26c13f);
    var _0x4b404c = _0x26c13f.find(".reply:eq(0)");
    _0x4b404c.remove();
    _0x26c13f.find(".breply,.blike").remove();
    _0x5e199c.find('.r').empty().append(_0x4b404c.css({
      'max-height': '',
      'height': "100%"
    }));
    _0x5e199c.find(".uzr .u-pic").first().css("background-position-y", "top");
    _0x5e199c.find(".emobox").off().click(function () {
      $(this).blur();
      var _0x836367 = $(this).offset();
      var _0x3f818e = _0x4a935e(this, _0x4d3c05, false);
      _0x3f818e.css({
        'left': '',
        'top': Math.max(0x0, _0x836367.top - $(_0x3f818e).height())
      });
    });
    _0x5e199c.find(".sndpm").off().click(function (_0x1882dc) {
      _0x1882dc.preventDefault();
      if (_0x40c83b == ".tboxbc") {
        replyId = _0x545a4e;
        _0x481c73(false, null, _0x5e199c.find(".tbox"));
      }
      if (_0x40c83b == "#tbox") {
        replyId = _0x545a4e;
        _0xb649c1(_0x5e199c.find(".tbox"));
      }
    });
    _0x5e199c.find(".tbox").val('').off().keyup(function (_0xe50c2b) {
      if (_0xe50c2b.keyCode == 0xd) {
        _0xe50c2b.preventDefault();
        if (_0x40c83b == ".tboxbc") {
          replyId = _0x545a4e;
          _0x481c73(false, null, _0x5e199c.find(".tbox"));
        }
        if (_0x40c83b == "#tbox") {
          replyId = _0x545a4e;
          _0xb649c1(_0x5e199c.find(".tbox"));
        }
      }
    });
    _0x5e199c.modal();
    _0x5e199c.find(".r .reply").scrollTop(_0x5e199c.find(".r .reply")[0x0].scrollHeight);
  }
  function _0x5b0377(_0x1e4899, _0x19e1a2) {
    var _0x235c8c = $(_0x2f6a63);
    var _0x30a3bf = _0x123150[_0x19e1a2.uid];
    var _0x417a32 = new Date().getTime() - _0x19e1a2.t;
    if (_0x417a32 < 0x0) {
      _0x19e1a2.t += _0x417a32;
    }
    _0x235c8c.find(".u-pic").css("background-image", "url(\"" + _0x19e1a2.pic + "\")").attr("onclick", "upro('" + _0x19e1a2.uid + "');");
    _0x235c8c.find(".tago").attr('ago', _0x19e1a2.t).text(_0xf9484c(_0x19e1a2.t));
    _0x235c8c.find(".u-topic").html(_0x19e1a2.topic).css("color", _0x19e1a2.ucol);
    _0x19e1a2.msg = _0x269d7e(_0x19e1a2.msg);
    var _0x49b870 = _0x367bdb(_0x19e1a2.msg.replace(/\n/g, ''));
    if (_0x49b870.length > 0x1 && _0x1e4899 != "#d2") {
      _0x19e1a2.msg = _0x19e1a2.msg.replace(_0x49b870[0x1], "<button onclick='ytube(\"https://www.youtube.com/embed/" + _0x49b870[0x0] + "\",this);' style='font-size:40px!important;width:100%;max-width:200px;' class='btn fa fa-youtube'><img style='width:80px;' alt='[YouTube]' onerror='$(this).parent().remove();' src='https://img.youtube.com/vi/" + _0x49b870[0x0] + "/0.jpg' ></button>");
    }
    _0x235c8c.find(".u-msg").html(_0x19e1a2.msg).css("color", _0x19e1a2.mcol).append(_0x235c8c.find(".d-flex.fr"));
    if (_0x19e1a2["class"] != null) {
      _0x235c8c.addClass(_0x19e1a2["class"]);
    }
    if (_0x30a3bf != null) {
      var _0x3e12a1 = _0x2b44e0(_0x30a3bf);
      if (_0x3e12a1 != '') {
        _0x235c8c.find(".u-ico").attr("src", _0x3e12a1);
      }
      ;
      _0x235c8c.find(".u-topic").css({
        'color': _0x30a3bf.ucol,
        'background-color': _0x30a3bf.bg
      });
    } else {
      _0x235c8c.find(".u-ico").remove();
      _0x235c8c.find(".u-topic").css({
        'color': _0x19e1a2.ucol || "#000",
        'background-color': _0x19e1a2.bg || ''
      });
    }
    var _0x4250ab = _0x3393a3(_0x19e1a2.ucol || "#000000", -0x1e);
    _0x235c8c.css({
      'background-color': _0x4250ab == '' || _0x4250ab == "#000000" || false ? '' : _0x4250ab + '06'
    });
    var _0x5403ed = _0x1e4899 == "#d2bc";
    _0x235c8c.find(".bdel").hide();
    if (_0x19e1a2.bid != null) {
      _0x235c8c.addClass("bid" + _0x19e1a2.bid);
      if (_0x41c3fc.delbc || _0x19e1a2.lid == (_0x123150[myid] || {
        'lid': null
      }).lid) {
        _0x235c8c.find(".bdel").attr("onclick", "send('delbc', {bid:'" + _0x19e1a2.bid + "'});").show();
      }
    }
    if (_0x19e1a2.mi != null) {
      _0x235c8c.addClass('mi' + _0x19e1a2.mi);
      if (_0x41c3fc.dmsg) {
        _0x235c8c.find(".bdel").attr("onclick", "send('dmsg', {mi:'" + _0x19e1a2.mi + "',topic:$(this).parent().parent().parent().find('.u-topic').text()});").show();
      }
    }
    if (_0x19e1a2.bid != null) {
      if (_0x104f82.bclikes == false) {
        _0x235c8c.find(".blike").remove();
      } else {
        _0x235c8c.find(".blike").attr("onclick", "send('likebc', {bid:'" + _0x19e1a2.bid + "'});").show().text(_0x19e1a2.likes || '');
      }
      if (_0x104f82.bcreply == false) {
        _0x235c8c.find(".breply").remove();
      } else {
        _0x235c8c.find(".breply").attr("onclick", "reply('.bid" + _0x19e1a2.bid + "',\".tboxbc\");").show();
      }
    } else {
      if (_0x19e1a2.mi != null) {
        if (_0x104f82.mlikes == false) {
          _0x235c8c.find(".blike").remove();
        } else {
          _0x235c8c.find(".blike").attr("onclick", "send('likem','" + _0x19e1a2.mi + "');").show();
        }
        if (_0x104f82.mreply == false) {
          _0x235c8c.find(".breply,.reply").remove();
        } else {
          _0x235c8c.find(".breply").attr("onclick", "reply('.mi" + _0x19e1a2.mi + "',\"#tbox\");").show();
        }
      } else {
        _0x235c8c.find(".blike,.breply").remove();
      }
    }
    if (_0x19e1a2.bmi || _0x19e1a2.rmi) {
      _0x235c8c.find(".reply").remove();
    }
    var _0x54511b = $(_0x1e4899);
    $.each(_0x235c8c.find("a.uplink"), function (_0x3cade3, _0x36ac66) {
      var _0x55ffc8 = $(_0x36ac66).attr('href') || '';
      var _0x34ba52 = true && (_0x30a3bf == null || _0x30a3bf && _0x30a3bf.rep >= 0x64);
      var _0x329e32 = mime[_0x55ffc8.split('.').pop().toLowerCase()] || '';
      if (_0x329e32.match(/image/i)) {
        var _0x33a31e = _0x55ffc8.split('/').pop().split('.');
        if (_0x33a31e.length == 0x3 && _0x34ba52) {
          var _0x3bbb66 = $("<a href='" + _0x55ffc8.substring(0x0, _0x55ffc8.lastIndexOf('.')) + "' target='_blank' style='display:block;width:174px;margin-bottom: -21px;'><img dsrc='" + _0x55ffc8 + "' style='width:150px;height:110px;' class='hand lazy fitimg'></a>");
          _0x3bbb66.insertAfter(_0x36ac66);
          $(_0x36ac66).remove();
        } else {
          var _0x3bbb66 = $("<div style='width:100%;'><button class='btn fl fa fa-image' style='color:black;'>عرض الصوره</button></div>");
          _0x3bbb66.insertAfter(_0x36ac66);
          $(_0x36ac66).remove();
          if (_0x33a31e.length == 0x3) {
            _0x55ffc8 = _0x55ffc8.substring(0x0, _0x55ffc8.lastIndexOf('.'));
          }
          _0x3bbb66.click(function () {
            $("<a href='" + _0x55ffc8 + "' target='_blank'><img style='max-width:100%;max-height:160px;display:block;' src='" + _0x55ffc8 + "' class='hand fitimg'></a>").insertAfter(_0x3bbb66);
            _0x3bbb66.remove();
          });
        }
      }
      if (_0x329e32.match(/video/i)) {
        var _0x3bbb66 = $("<div style='width:100%;'><button class='btn' style='color:black;padding:0px 4px;margin-bottom:-21px;min-height:32px;'>▶ " + (_0x34ba52 ? "<img class='lazy' dsrc='" + _0x55ffc8 + ".jpg' style='width:122px;height:110px;'>" : "عرض الفيديو") + "</button></div>");
        _0x3bbb66.insertAfter(_0x36ac66);
        $(_0x36ac66).remove();
        _0x3bbb66.click(function () {
          $("<video onplay='if(playing!=null && playing!= this&&!playing.paused){playing.pause();};playing=this;' style='width:100%;max-height:160px;' controls autoplay><source src='" + _0x55ffc8 + "'></video>").insertAfter(_0x3bbb66);
          _0x3bbb66.remove();
        });
      }
      if (_0x329e32.match(/audio/i)) {
        var _0x3bbb66 = $("<div style='width:100%;'><button class='btn fl fa fa-youtube-play' style='color:black;'>مقطع صوت</button></div>");
        _0x3bbb66.insertAfter(_0x36ac66);
        $(_0x36ac66).remove();
        _0x3bbb66.click(function () {
          $("<audio onplay='if(playing!=null&& playing!= this&&!playing.paused){playing.pause();};playing=this;' style='width:100%;' controls><source src='" + _0x55ffc8 + "' type='audio/mpeg'></audio>").insertAfter(_0x3bbb66);
          _0x3bbb66.remove();
        });
      }
    });
    if (_0x5403ed == true) {} else {
      if (_0x19e1a2.rmi != null) {
        _0x235c8c.find(".breply").remove();
        var _0x4e062d = $(".d2 .mi" + _0x19e1a2.rmi).find(".reply");
        if (_0x4e062d.length) {
          var _0x1b18e4 = $(".mi" + _0x19e1a2.rmi).find(".breply");
          _0x1b18e4.text((parseInt(_0x1b18e4.text()) || 0x0) + 0x1);
          _0x4e062d.append(_0x235c8c);
        }
        var _0x1b18e4 = $("#rpl .mi" + _0x19e1a2.rmi);
        if (_0x1b18e4.length) {
          _0x4e062d = $("#rpl .r .reply");
          _0x4e062d.append(_0x235c8c[0x0].outerHTML);
          _0x4e062d.stop().animate({
            'scrollTop': _0x4e062d[0x0].scrollHeight
          }, 0x64);
        }
      } else {
        _0x235c8c.appendTo(_0x54511b);
      }
    }
    if (_0x5403ed == true && true) {
      if (_0x54511b[0x0].childNodes.length >= 0x64) {
        _0x54511b[0x0].childNodes[_0x54511b[0x0].childNodes.length - 0x1].remove();
      }
      if (_0x54511b[0x0].scrollTop == 0x0 || _0x19e1a2.uid == myid) {
        if (_0x19e1a2.bmi != null) {
          _0x235c8c.find(".breply").remove();
          var _0x4e062d = $(".d2 .bid" + _0x19e1a2.bmi).find(".reply");
          if (_0x4e062d.length) {
            var _0x1b18e4 = $(".bid" + _0x19e1a2.bmi).find(".breply");
            _0x1b18e4.text((parseInt(_0x1b18e4.text()) || 0x0) + 0x1);
            _0x4e062d.append(_0x235c8c);
          }
          var _0x1b18e4 = $("#rpl .bid" + _0x19e1a2.bmi);
          if (_0x1b18e4.length) {
            _0x4e062d = $("#rpl .r .reply");
            _0x4e062d.append(_0x235c8c[0x0].outerHTML);
            _0x4e062d.stop().animate({
              'scrollTop': _0x4e062d[0x0].scrollHeight
            }, 0x64);
          }
        } else {
          _0x54511b.prepend(_0x235c8c);
          if (_0x19e1a2.uid == myid) {
            _0x54511b.scrollTop(_0x235c8c.innerHeight());
            _0x54511b.stop().animate({
              'scrollTop': 0x0
            }, 0x64);
          }
        }
      } else {
        if (_0x19e1a2.bmi != null) {
          _0x235c8c.find(".breply").remove();
          var _0x4e062d = $("#d2bc").find(".bid" + _0x19e1a2.bmi).find(".reply");
          if (_0x4e062d.length) {
            var _0x1b18e4 = $("#d2bc").find('.bid' + _0x19e1a2.bmi).find(".breply");
            _0x1b18e4.text((parseInt(_0x1b18e4.text()) || 0x0) + 0x1);
            _0x4e062d.append(_0x235c8c);
          }
          var _0x1b18e4 = $("#rpl").find(".bid" + _0x19e1a2.bmi);
          if (_0x1b18e4.length) {
            _0x4e062d = $("#rpl").find(".r .reply");
            _0x4e062d.append(_0x235c8c[0x0].outerHTML);
            _0x4e062d.stop().animate({
              'scrollTop': _0x4e062d[0x0].scrollHeight
            }, 0x64);
          }
        } else {
          _0x235c8c.prependTo(_0x54511b);
          $("#bcmore").show();
          _0x46b8de = true;
        }
      }
    } else {
      if (_0x5403ed && false) {
        if (_0x54511b[0x0].childNodes.length >= 0x64) {
          _0x54511b[0x0].childNodes[0x0].remove();
        }
        if (_0x54511b[0x0].scrollHeight - _0x54511b[0x0].clientHeight - _0x54511b[0x0].scrollTop <= 0x1 || _0x19e1a2.uid == myid) {
          if (_0x19e1a2.bmi != null) {
            _0x235c8c.find(".breply").remove();
            var _0x4e062d = $(".d2 .bid" + _0x19e1a2.bmi).find(".reply");
            if (_0x4e062d.length) {
              var _0x1b18e4 = $(".bid" + _0x19e1a2.bmi).find(".breply");
              _0x1b18e4.text((parseInt(_0x1b18e4.text()) || 0x0) + 0x1);
              _0x4e062d.append(_0x235c8c);
            }
            var _0x1b18e4 = $("#rpl .bid" + _0x19e1a2.bmi);
            if (_0x1b18e4.length) {
              _0x4e062d = $("#rpl .r .reply");
              _0x4e062d.append(_0x235c8c[0x0].outerHTML);
              _0x4e062d.stop().animate({
                'scrollTop': _0x4e062d[0x0].scrollHeight
              }, 0x64);
            }
          } else {
            _0x54511b.append(_0x235c8c);
            _0x54511b.stop().animate({
              'scrollTop': _0x54511b[0x0].scrollHeight - 0x1
            }, 0x64);
          }
        } else {
          if (_0x19e1a2.bmi != null) {
            _0x235c8c.find(".breply").remove();
            var _0x4e062d = $("#d2bc").find(".bid" + _0x19e1a2.bmi).find(".reply");
            if (_0x4e062d.length) {
              var _0x1b18e4 = $("#d2bc").find(".bid" + _0x19e1a2.bmi).find(".breply");
              _0x1b18e4.text((parseInt(_0x1b18e4.text()) || 0x0) + 0x1);
              _0x4e062d.append(_0x235c8c);
            }
            var _0x1b18e4 = $("#rpl").find(".bid" + _0x19e1a2.bmi);
            if (_0x1b18e4.length) {
              _0x4e062d = $("#rpl").find(".r .reply");
              _0x4e062d.append(_0x235c8c[0x0].outerHTML);
              _0x4e062d.stop().animate({
                'scrollTop': _0x4e062d[0x0].scrollHeight
              }, 0x64);
            }
          } else {
            _0x235c8c.appendTo(_0x54511b);
            _0x54511b.stop().animate({
              'scrollTop': _0x54511b[0x0].scrollTop + _0x54511b[0x0].scrollHeight / 0x4
            }, 0x64);
          }
        }
      } else if (_0x54511b.length) {
        if (_0x54511b[0x0].childNodes.length >= 0x24) {
          _0x54511b[0x0].childNodes[0x0].remove();
        }
        _0x54511b.stop().animate({
          'scrollTop': _0x54511b[0x0].scrollHeight
        }, 0x64);
      }
    }
    return _0x235c8c;
  }
  function _0x365c7f(_0x1a30d2, _0x1cfcfb) {
    _0x13aa85("action", {
      'cmd': 'gift',
      'id': _0x1a30d2,
      'gift': _0x1cfcfb
    });
  }
  function _0x3e679c(_0xa4ac99, _0x1912ad) {
    if (_0x1912ad == null) {
      return;
    }
    if (_0x1912ad == '') {
      _0x13aa85('bnr-', {
        'u2': _0xa4ac99
      });
    } else {
      _0x13aa85('bnr', {
        'u2': _0xa4ac99,
        'bnr': _0x1912ad
      });
    }
  }
  function _0x2f5bb8(_0x1caf82) {
    if (_0x431123) {
      return;
    }
    window.onbeforeunload = null;
    _0x431123 = true;
    if (_0x51f8c1) {
      window.close();
      return;
    }
    setTimeout("location.href=\"/\";", _0x1caf82 || 0xbb8);
  }
  function _0x5ca9c0() {
    var _0x1b7645 = _0x28bd2e("blocklist");
    if (_0x1b7645 != null && _0x1b7645 != '') {
      try {
        _0x1b7645 = JSON.parse(_0x1b7645);
        if (Array.isArray(_0x1b7645)) {
          _0x3fdde1 = _0x1b7645;
        }
      } catch (_0x408bdc) {}
    }
  }
  function _0x2eaa1a() {
    var _0x44b4c1 = JSON.stringify(_0x3fdde1);
    _0x208c8b("blocklist", _0x44b4c1);
  }
  function _0x1acd05(_0x21f585) {
    for (var _0x17745e = 0x0; _0x17745e < _0x3fdde1.length; _0x17745e++) {
      var _0x282450 = _0x3fdde1[_0x17745e];
      if (_0x282450.lid == _0x21f585.lid) {
        _0x3fdde1.splice(_0x17745e, 0x1);
        _0x29d482(_0x21f585.id);
      }
    }
    _0x2eaa1a();
  }
  function _0x2f51ec(_0x24c865) {
    if (_0x24c865.id == myid) {
      return;
    }
    for (var _0x42a8ad = 0x0; _0x42a8ad < _0x3fdde1.length; _0x42a8ad++) {
      var _0x52b981 = _0x3fdde1[_0x42a8ad];
      if (_0x52b981.lid == _0x24c865.lid) {
        return;
      }
    }
    _0x3fdde1.push({
      'lid': _0x24c865.lid
    });
    _0x29d482(_0x24c865.id);
    _0x2eaa1a();
  }
  function _0x3c84fc(_0xd42edf) {
    for (var _0x4ecc9e = 0x0; _0x4ecc9e < _0x3fdde1.length; _0x4ecc9e++) {
      var _0x139cac = _0x3fdde1[_0x4ecc9e];
      if (_0x139cac.lid == _0xd42edf.lid) {
        return true;
      }
    }
    return false;
  }
  var _0x58ccea = {};
  function _0x2ad799(_0x1efd6f) {
    var _0x8b990e = _0x41c3fc.roomowner;
    var _0x366e04 = _0x123150[_0x1efd6f];
    if (_0x366e04 == null) {
      return;
    }
    if (_0x1efd6f != myid) {
      if (_0x58ccea[_0x1efd6f] != null) {
        if (new Date().getTime() - _0x58ccea[_0x1efd6f] > 300000) {
          delete _0x58ccea[_0x1efd6f];
        }
      }
      if (_0x58ccea[_0x1efd6f] == null) {}
    }
    if (_0x366e04.s && _0x3e8a07(_0x366e04.power).rank > _0x41c3fc.rank) {
      return;
    }
    var _0x370e0d = $("#upro");
    var _0x50b8d7 = _0x366e04.pic.split('.');
    if (_0x366e04.pic.split('/').pop().split('.').length > 0x2) {
      _0x50b8d7.splice(_0x50b8d7.length - 0x1, 0x1);
    }
    _0x370e0d.find(".u-pic").css("background-image", "url(\"" + _0x50b8d7.join('.') + "\")").removeClass("fitimg").addClass("fitimg");
    _0x370e0d.find(".u-msg").html(_0x366e04.msg);
    if (uf[(_0x366e04.co || '').toLocaleLowerCase()] != null) {
      _0x370e0d.find(".u-co").text(uf[_0x366e04.co.toLocaleLowerCase()]).append("<img style=\"width:24px;height:24px;border-radius:1px;margin-top: -3px;\" class=\"fl\" src=\"flags/" + _0x366e04.co + ".png\">");
    } else {
      _0x370e0d.find(".u-co").text('--');
    }
    var _0x4164d7 = _0x2b44e0(_0x366e04);
    var _0x518ad1 = "بدون غرفه";
    var _0xfb4416 = rcach[_0x366e04.roomid];
    if (_0x41c3fc.unick == true || _0x41c3fc.mynick == true && _0x1efd6f == myid) {
      $(".u-topic").val(_0x366e04.topic);
      _0x370e0d.find(".nickbox").show();
      _0x370e0d.find(".u-nickc").off().click(function () {
        _0x13aa85("unick", {
          'id': _0x1efd6f,
          'nick': _0x370e0d.find(".u-topic").val()
        });
      });
    } else {
      _0x370e0d.find(".nickbox").hide();
    }
    if (_0x41c3fc.rinvite) {
      _0x370e0d.find(".roomzbox").show();
      _0x370e0d.find(".rpwd").val('');
      var _0x3e2983 = _0x370e0d.find(".roomz");
      _0x3e2983.empty();
      for (var _0x34a8d3 = 0x0; _0x34a8d3 < _0x12093e.length; _0x34a8d3++) {
        var _0x2629c4 = $("<option></option>");
        _0x2629c4.attr("value", _0x12093e[_0x34a8d3].id);
        if (_0x12093e[_0x34a8d3].id == myroom) {
          _0x2629c4.css("color", "blue");
          _0x2629c4.attr("selected", 'true');
        }
        _0x2629c4.text('[' + (_0x12093e[_0x34a8d3].uco + '').padStart(0x2, '0') + ']' + _0x12093e[_0x34a8d3].topic);
        _0x3e2983.append(_0x2629c4);
      }
      var _0x3b8c29 = $("#rooms .roomz option");
      var _0x16d86a = _0x3b8c29.map(function (_0x5d272b, _0x11389d) {
        return {
          't': $(_0x11389d).text(),
          'v': _0x11389d.value
        };
      }).get();
      _0x16d86a.sort(function (_0x26321f, _0x5b8738) {
        var _0x1077f9 = _0x26321f.t.toLowerCase();
        var _0x19277a = _0x5b8738.t.toLowerCase();
        return _0x1077f9 > _0x19277a ? -0x1 : _0x1077f9 < _0x19277a ? 0x1 : 0x0;
      });
      _0x370e0d.find(".uroomz").off().click(function () {
        _0x13aa85("rinvite", {
          'id': _0x1efd6f,
          'rid': _0x3e2983.val(),
          'pwd': _0x370e0d.find(".rpwd").val()
        });
      });
    } else {
      _0x370e0d.find(".roomzbox").hide();
    }
    if (_0x41c3fc.setLikes) {
      _0x370e0d.find(".likebox").show();
      _0x370e0d.find(".likebox .likec").val(_0x366e04.rep);
      _0x370e0d.find(".ulikec").off().click(function () {
        var _0x5ea0d2 = parseInt(_0x370e0d.find(".likebox .likec").val()) || 0x0;
        _0x13aa85("setLikes", {
          'id': _0x366e04.id,
          'likes': _0x5ea0d2
        });
      });
    } else {
      _0x370e0d.find(".likebox").hide();
    }
    if (_0x41c3fc.setpower) {
      _0x5a3802 = _0x5a3802.sort(function (_0xf4fb2e, _0xecae6) {
        return _0xecae6.rank - _0xf4fb2e.rank;
      });
      _0x370e0d.find(".powerbox").show();
      var _0x11e88a = _0x370e0d.find(".userpower");
      _0x370e0d.find("#upsearch").off().val('').change(function () {
        _0xe4ce83(_0x41c3fc, _0x366e04.power);
      });
      _0xe4ce83(_0x41c3fc, _0x366e04.power);
      _0x370e0d.find(".powerbox .userdays").val(0x0);
      _0x370e0d.find(".upower").off().click(function () {
        var _0x3b4efa = parseInt(_0x370e0d.find(".userdays").val()) || 0x0;
        _0x13aa85('cp', {
          'cmd': "setpower",
          'id': _0x366e04.lid,
          'days': _0x3b4efa,
          'power': _0x11e88a.val()
        });
      });
    } else {
      _0x370e0d.find(".powerbox").hide();
    }
    if (_0xfb4416 != null) {
      if (_0xfb4416.ops != null) {
        if (_0xfb4416.ops.indexOf(_0x123150[myid].lid) != -0x1 || _0xfb4416.owner == _0x123150[myid].lid || _0x41c3fc.roomowner) {
          _0x8b990e = true;
        }
      }
      _0x518ad1 = "<div class=\"fl btn btn-primary dots roomh border\" style=\"padding:0px 5px;max-width:180px;\" onclick=\"rjoin('" + _0xfb4416.id + "')\"><img style=\"max-width:24px;\" src='" + _0xfb4416.pic + "'>" + _0xfb4416.topic + "</div>";
      _0x370e0d.find(".u-room").html(_0x518ad1);
      _0x370e0d.find(".u-room").show();
    } else {
      _0x370e0d.find(".u-room").hide();
    }
    if (_0x8b990e) {
      _0x370e0d.find(".urkick,.umod").show();
    } else {
      _0x370e0d.find(".urkick,.umod").hide();
    }
    if (_0x3c84fc(_0x366e04)) {
      _0x370e0d.find(".umute").hide();
      _0x370e0d.find(".uunmute").show();
    } else {
      _0x370e0d.find(".umute").show();
      _0x370e0d.find(".uunmute").hide();
    }
    _0x370e0d.find(".ureport").hide();
    if (_0x41c3fc.setpower != true) {
      _0x370e0d.find(".ubnr").hide();
    } else {
      _0x370e0d.find(".ubnr").show();
    }
    if (_0x41c3fc.history != true) {
      _0x370e0d.find(".uh").hide();
    } else {
      _0x370e0d.find(".uh").show();
    }
    if (_0x41c3fc.kick < 0x1) {
      _0x370e0d.find(".ukick").hide();
      _0x370e0d.find(".udelpic").hide();
    } else {
      _0x370e0d.find(".ukick").show();
      _0x370e0d.find(".udelpic").show();
    }
    if (!_0x41c3fc.ban) {
      _0x370e0d.find(".uban").hide();
    } else {
      _0x370e0d.find(".uban").show();
    }
    if (_0x41c3fc.upgrades < 0x1) {
      _0x370e0d.find(".ugift").hide();
    } else {
      _0x370e0d.find(".ugift").show();
    }
    if (_0x41c3fc.mic) {
      _0x370e0d.find(".uml,.umm,.uma").show();
    } else {
      _0x370e0d.find(".uml,.umm,.uma").hide();
    }
    _0x370e0d.find(".uh").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x370e0d.modal("hide");
      _0x13aa85('uh', _0x1efd6f);
    });
    _0x370e0d.find('.uml').css("background-color", '').off().click(function () {
      _0x13aa85("uml", _0x1efd6f);
      $(this).css("background-color", "indianred");
    });
    _0x370e0d.find(".umm").css("background-color", '').off().click(function () {
      _0x13aa85("umm", _0x1efd6f);
      $(this).css("background-color", "indianred");
    });
    _0x370e0d.find('.uma').css("background-color", '').off().click(function () {
      _0x13aa85("uma", _0x1efd6f);
      $(this).css("background-color", "indianred");
    });
    _0x370e0d.find(".umute").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x2f51ec(_0x366e04);
      _0x370e0d.find(".umute").hide();
      _0x370e0d.find(".uunmute").show();
    });
    _0x370e0d.find(".uunmute").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x1acd05(_0x366e04);
      _0x370e0d.find(".umute").show();
      _0x370e0d.find(".uunmute").hide();
    });
    _0x370e0d.find(".umod").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("op+", {
        'lid': _0x366e04.lid
      });
    });
    _0x370e0d.find(".ulike").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("action", {
        'cmd': "like",
        'id': _0x1efd6f
      });
    }).text(_0x5a83db(_0x366e04.rep || 0x0) + '');
    _0x370e0d.find(".ureport").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("action", {
        'cmd': "report",
        'id': _0x1efd6f
      });
    });
    _0x370e0d.find(".ukick").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("action", {
        'cmd': "kick",
        'id': _0x1efd6f
      });
      _0x370e0d.modal("hide");
    });
    _0x370e0d.find(".udelpic").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("action", {
        'cmd': "delpic",
        'id': _0x1efd6f
      });
    });
    _0x370e0d.find(".urkick").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("action", {
        'cmd': "roomkick",
        'id': _0x1efd6f
      });
      _0x370e0d.modal("hide");
    });
    _0x370e0d.find(".uban").css("background-color", '').off().click(function () {
      $(this).css("background-color", "indianred");
      _0x13aa85("action", {
        'cmd': "ban",
        'id': _0x1efd6f
      });
      _0x370e0d.modal("hide");
    });
    _0x370e0d.find(".unot").css("background-color", '').off().click(function () {
      var _0x11be30 = this;
      _0x38de81(function (_0x3b4038) {
        _0x13aa85("action", {
          'cmd': "not",
          'id': _0x1efd6f,
          'msg': _0x3b4038
        });
        $(_0x11be30).css("background-color", "indianred");
      });
    });
    _0x370e0d.find(".ugift").css("background-color", '').off().click(function () {
      var _0x19196a = $("<div class=\"break fl\" style=\"max-height:400px;width:300px;background-color:white;\"></div>");
      $.each(_0x177759, function (_0x266a72, _0x157ea8) {
        _0x19196a.append("<img style='padding:5px;margin:4px;max-width:160px;max-height:40px;' class='btn hand borderg corner' src='dro3/" + _0x157ea8 + "' onclick='gift(\"" + _0x1efd6f + "\",\"" + _0x157ea8 + "\");'>");
      });
      _0x19196a.append("<button style='padding:5px;margin:4px;' class='btn btn-primary hand borderg corner fa fa-ban'  onclick='gift(\"" + _0x1efd6f + "\",\"\");'>إزاله الهديه</button>");
      _0x4a935e(_0x370e0d.find(".ugift"), _0x19196a, false).css('left', "0px");
    });
    _0x370e0d.find(".ubnr").css("background-color", '').off().click(function () {
      var _0x2a5e14 = $("<div class=\"break\" style=\"max-height:400px;width:300px;background-color:white;\"></div>");
      $.each(_0x28bd34, function (_0x330063, _0x11695d) {
        _0x2a5e14.append("<img style='padding:5px;margin:4px;max-width:160px;max-height:40px;' class='btn hand borderg corner' src='sico/" + _0x11695d + "' onclick='ubnr(\"" + _0x1efd6f + "\",\"" + _0x11695d + "\");'>");
      });
      _0x2a5e14.append("<button style='padding:5px;margin:4px;' class='btn btn-primary hand borderg corner fa fa-ban'  onclick='ubnr(\"" + _0x1efd6f + "\",\"\");'>إزاله البنر</button>");
      _0x4a935e(_0x370e0d.find(".ubnr"), _0x2a5e14, false).css("left", "0px");
    });
    _0x370e0d.modal();
    var _0x5a1a76 = '';
    if (_0x4164d7 != '') {
      _0x5a1a76 = "<img class=\"fl u-ico\"  alt=\"\" src=\"" + _0x4164d7 + "\">";
    }
    _0x370e0d.find(".modal-title").html("<img style='width:18px;height:18px;' src='" + _0x366e04.pic + "'>" + _0x5a1a76 + _0x366e04.topic);
    _0x370e0d.find(".upm").off().click(function () {
      _0x370e0d.modal("hide");
      _0x396de8(_0x1efd6f, true);
    });
    _0x175dc4(0x1);
  }
  function _0xe4ce83(_0x160891, _0x172a23) {
    var _0xaaed22 = $("#upro");
    var _0x390ca1 = $("#upsearch").val();
    var _0x54f2d2 = _0x390ca1 == '' ? _0x5a3802 : _0x5a3802.filter(function (_0x4148fc) {
      return _0x4148fc.rank == _0x390ca1 || _0x4148fc.name.indexOf(_0x390ca1) != -0x1;
    });
    var _0x8a88a6 = _0xaaed22.find(".userpower");
    _0x8a88a6.empty();
    _0x8a88a6.append("<option></option>");
    for (var _0x2319f6 = 0x0; _0x2319f6 < _0x54f2d2.length; _0x2319f6++) {
      var _0x54a0df = $("<option></option>");
      if (_0x54f2d2[_0x2319f6].rank > _0x160891.rank) {
        _0x54a0df = $("<option disabled></option>");
      }
      _0x54a0df.attr("value", _0x54f2d2[_0x2319f6].name);
      if (_0x54f2d2[_0x2319f6].name == _0x172a23) {
        _0x54a0df.css("color", "blue");
        _0x54a0df.attr("selected", "true");
      }
      _0x54a0df.text('[' + _0x54f2d2[_0x2319f6].rank + "] " + _0x54f2d2[_0x2319f6].name);
      _0x8a88a6.append(_0x54a0df);
    }
  }
  function _0x8d88fa(_0x39cd1e, _0x312541, _0x5d2886) {
    var _0xfe4b76 = $("<div class='border bg' style='min-width:66px;margin-top:4px;padding:2px;'></div>");
    for (var _0x101210 = 0x0; _0x101210 < _0x312541.length; _0x101210++) {
      var _0x56eab7 = $("<button class=' btn btn-primary' style='display:block;width:100%;padding: 2px 4px;margin-top:1px;'></button>").text(_0x312541[_0x101210]).on("click", function () {
        _0x5d2886($(this).text());
      });
      _0xfe4b76.append(_0x56eab7);
    }
    return _0x4a935e(_0x39cd1e, _0xfe4b76).removeClass("light").removeClass("border").css("max-height", "80%");
  }
  function _0x4a935e(_0x1f670d, _0x285943, _0x20265f, _0x5e153d, _0x59d7e2) {
    $(".ppop").remove();
    _0x1f670d = $(_0x1f670d);
    var _0x45cdf4 = _0x1f670d.offset();
    var _0xb51b97 = $("<div class=\"ppop light border break\" style=\"z-index:9000;position: fixed;left:" + _0x45cdf4.left + "px;top:" + _0x45cdf4.top + "px;\"></div>");
    setTimeout(function () {
      if (_0x5e153d) {
        _0xb51b97.css("width", _0x5e153d);
      }
      if (_0x59d7e2) {
        _0xb51b97.css("width", _0x59d7e2);
      }
      _0xb51b97.append(_0x285943);
      $(_0x1f670d.parent()).append(_0xb51b97);
      if (_0x45cdf4.left + _0xb51b97.width() > window.innerWidth) {
        _0xb51b97.css("left", Math.max(0x0, Math.ceil(_0x45cdf4.left - _0xb51b97.width())));
      }
      if (_0x45cdf4.top + _0xb51b97.height() > window.innerHeight) {
        _0xb51b97.css("top", Math.max(0x0, Math.ceil(_0x45cdf4.top - _0xb51b97.height())));
      }
      if (_0x20265f != true) {
        setTimeout(function () {
          $(document.body).one("click", function () {
            $(".ppop").remove();
          });
        }, 0x78);
      }
    }, 0xa);
    return _0xb51b97;
  }
  function _0x46cac4(_0x3ad704, _0x24d157) {
    $(".popx").remove();
    var _0x4e0491 = $($("#pop").html());
    _0x4e0491.addClass("popx");
    _0x4e0491.find(".title").append(_0x3ad704);
    _0x4e0491.find(".pphide").addClass("phide");
    _0x4e0491.find(".body").append(_0x24d157);
    $(document.body).append(_0x4e0491);
    _0x4e0491.show();
    return _0x4e0491;
  }
  function _0x2cebd6(_0x2eef65) {
    var _0x52de8c = rcach[_0x2eef65];
    if (_0x52de8c == null) {
      return [];
    }
    return $.grep(_0x41a1d0, function (_0x36fc05) {
      return _0x36fc05.roomid == _0x2eef65;
    });
  }
  function _0x162e40(_0x45bc3d) {
    var _0x25d352 = window.location.search.substring(0x1);
    var _0x31fc49 = _0x25d352.split('&');
    for (var _0x116041 = 0x0; _0x116041 < _0x31fc49.length; _0x116041++) {
      var _0x413dab = _0x31fc49[_0x116041].split('=');
      if (_0x413dab[0x0] == _0x45bc3d) {
        return ('' + decodeURIComponent(_0x413dab[0x1])).split('<').join("&#x3C;");
      }
    }
  }
  function _0x504219() {
    $("#ops").children().remove();
    var _0x4acf07 = $('#mkr');
    _0x4acf07.find(".rsave").hide();
    _0x4acf07.find(".rdelete").hide();
    _0x4acf07.find(".modal-title").text("إنشاء غرفه جديدة");
    _0x4acf07.modal();
    _0x4acf07.find(".rtopic").val('');
    _0x4acf07.find(".rabout").val('');
    _0x4acf07.find(".rpwd").val('');
    _0x4acf07.find(".rwelcome").val('');
    _0x4acf07.find(".rmax").val('');
    _0x4acf07.find(".cpick").attr('v', "#000000").css("background-color", "#000000");
    _0x4acf07.find("img").attr("src", "room.png");
    _0x4acf07.find(".rdel").prop("checked", false).parent().show();
    _0x4acf07.find(".rmake").show().off().click(function () {
      _0x4acf07.find(".rl").val('');
      _0x4acf07.find(".rvl").val('');
      _0x4acf07.find('.rv').hide().prop("checked", false);
      _0x13aa85('r+', {
        'c': _0x4acf07.find(".cpick").attr('v') || "#000000",
        'topic': _0x4acf07.find(".rtopic").val(),
        'about': _0x4acf07.find(".rabout").val(),
        'welcome': _0x4acf07.find(".rwelcome").val(),
        'pass': _0x4acf07.find(".rpwd").val(),
        'max': parseInt(_0x4acf07.find(".rmax").val()) || 0x14,
        'delete': _0x4acf07.find(".rdel").prop("checked") == false,
        'l': parseInt(_0x4acf07.find('.rl').val()) || 0x0,
        'vl': parseInt(_0x4acf07.find(".rvl").val()) || 0x0,
        'pic': _0x4acf07.find('img').attr('src')
      });
      _0x4acf07.modal("hide");
    });
  }
  function _0x419085(_0xe4bfe) {
    $("#ops").children().remove();
    if (_0xe4bfe == null) {
      _0xe4bfe = myroom;
    }
    var _0x2105ab = rcach[_0xe4bfe];
    if (_0x2105ab == null) {
      return;
    }
    var _0x4c0841 = $("#mkr");
    _0x4c0841.find(".modal-title").text("إداره الغرفه");
    _0x4c0841.find(".rsave").show().off().click(function () {
      _0x13aa85('r^', {
        'id': _0xe4bfe,
        'c': _0x4c0841.find(".cpick").attr('v') || "#000000",
        'topic': _0x4c0841.find(".rtopic").val(),
        'about': _0x4c0841.find(".rabout").val(),
        'welcome': _0x4c0841.find(".rwelcome").val(),
        'pass': _0x4c0841.find(".rpwd").val(),
        'max': parseInt(_0x4c0841.find(".rmax").val()) || 0x2,
        'l': parseInt(_0x4c0841.find(".rl").val()) || 0x0,
        'vl': parseInt(_0x4c0841.find(".rvl").val()) || 0x0,
        'pic': _0x4c0841.find('img').attr("src")
      });
      if (_0x3e8a07(_0x123150[myid].power).cmic) {
        _0x13aa85('v', {
          'id': _0xe4bfe,
          'v': _0x4c0841.find(".rv").prop("checked")
        });
      }
      _0x4c0841.modal("hide");
    });
    _0x4c0841.find(".rdelete").show().off().click(function () {
      if (confirm("تأكيد حذف الغرفه؟")) {
        _0x13aa85('r-', {
          'id': _0xe4bfe
        });
        _0x4c0841.modal("hide");
      }
    });
    ;
    _0x4c0841.modal({
      'title': "ffff"
    });
    _0x4c0841.find(".rpwd").val('');
    _0x4c0841.find(".rtopic").val(_0x2105ab.topic);
    _0x4c0841.find(".rabout").val(_0x2105ab.about);
    _0x4c0841.find(".rwelcome").val(_0x2105ab.welcome);
    _0x4c0841.find(".rmax").val(_0x2105ab.max);
    _0x4c0841.find(".rl").val(_0x2105ab.l || '');
    _0x4c0841.find(".rvl").val(_0x2105ab.vl || '');
    _0x4c0841.find(".rv").show().prop("checked", _0x2105ab.v == true);
    _0x4c0841.find(".rmake").hide();
    _0x4c0841.find(".rdel").parent().hide();
    _0x4c0841.find("img").attr("src", _0x2105ab.pic);
    _0x4c0841.find(".cpick").attr('v', _0x2105ab.c || "#000000").css("background-color", _0x2105ab.c || "#000000");
    _0x13aa85("ops", {
      'roomid': _0xe4bfe
    });
  }
  function _0x437040(_0x491924) {
    if (_0x4150cb || _0x491924.pic == "room.png" && typeof room_pic == "string") {
      _0x491924.pic = room_pic;
    }
    _0x491924.c = _0x491924.c || "#000000";
    var _0x42fb62 = _0x491924.ht;
    _0x42fb62.find(".u-pic").css("background-image", "url(" + _0x491924.pic + ')');
    if (_0x491924.needpass) {
      _0x42fb62.find(".u-topic").html("<img src=\"imgs/lock.png\" style=\"margin:2px;margin-top:4px;\" class=\"fl\">" + _0x491924.topic).css("color", _0x491924.c);
    } else {
      var _0x4f0bd6 = _0x42fb62.find(".u-topic");
      _0x4f0bd6[0x0].innerText = _0x491924.topic;
      _0x4f0bd6.css("color", _0x491924.c);
    }
    _0x42fb62.attr('n', _0x491924.topic || '');
    _0x42fb62.find(".u-msg")[0x0].innerText = _0x491924.about;
    _0x42fb62.find('.uc').toggleClass("fa-microphone", _0x491924.v).toggleClass("label-danger", _0x491924.v).toggleClass("label-primary", !_0x491924.v);
    var _0x868cfc = _0x3393a3(_0x491924.c || "#000000", -0x1e);
    _0x42fb62[0x0].style["background-color"] = _0x868cfc == "#000000" || false ? '' : _0x868cfc + '06';
  }
  function _0x539fd2(_0x48c1ef, _0x3bd5f1) {
    if (_0x4150cb || _0x48c1ef.pic == "room.png" && typeof room_pic == "string") {
      _0x48c1ef.pic = room_pic;
    }

    if (!_0x257591 || _0x257591 === '*') {
        _0x257591 = $("#rhtml").html();
    }
    var _0x2c5ee9 = $(_0x257591);
    _0x2c5ee9[0x0].className += " r" + _0x48c1ef.id;
    _0x2c5ee9[0x0].setAttribute("onclick", "rjoin('" + _0x48c1ef.id + "');");
    _0x2c5ee9[0x0].setAttribute('v', '0');
    _0x48c1ef.ht = _0x2c5ee9;
    _0x48c1ef.uco = 0x0;
    _0x437040(_0x48c1ef);
    if (_0x3bd5f1 != true) {
      $("#rooms").append(_0x2c5ee9);
    } else {
      return _0x2c5ee9;
    }
  }
  function _0x93a77a(_0x39648a) {
    return $.grep(_0x41a1d0, function (_0x2af59a) {
      return _0x2af59a.lid == _0x39648a;
    })[0x0];
  }
  function _0x3da5df(_0x457a6f) {
    $('#c' + _0x457a6f).remove();
    $('.w' + _0x457a6f).remove();
    _0x5727b3();
  }
  function _0x414243(_0xcb0f5e, _0x559c85) {
    var _0x54625a;
    var _0xabd9f8;
    var _0x5b9c70;
    var _0x56b7f7;
    var _0x369051;
    var _0x24627d;
    _0xcb0f5e = _0xcb0f5e.join('');
    _0x54625a = _0xcb0f5e.length & 0x3;
    _0xabd9f8 = _0xcb0f5e.length - _0x54625a;
    _0x5b9c70 = _0x559c85;
    0xcc9e2d51;
    0x1b873593;
    _0x24627d = 0x0;
    while (_0x24627d < _0xabd9f8) {
      _0x369051 = _0xcb0f5e.charCodeAt(_0x24627d) & 0xff | (_0xcb0f5e.charCodeAt(++_0x24627d) & 0xff) << 0x8 | (_0xcb0f5e.charCodeAt(++_0x24627d) & 0xff) << 0x24 | (_0xcb0f5e.charCodeAt(++_0x24627d) & 0xff) << 0x18;
      ++_0x24627d;
      _0x369051 = (_0x369051 & 0xffff) * 0xcc9e2d51 + (((_0x369051 >>> 0x24) * 0xcc9e2d51 & 0xffff) << 0x24) & 0xffffffff;
      _0x369051 = _0x369051 << 0xf | _0x369051 >>> 0x11;
      _0x369051 = (_0x369051 & 0xffff) * 0x1b873593 + (((_0x369051 >>> 0x24) * 0x1b873593 & 0xffff) << 0x24) & 0xffffffff;
      _0x5b9c70 ^= _0x369051;
      _0x5b9c70 = _0x5b9c70 << 0xd | _0x5b9c70 >>> 0x13;
      _0x56b7f7 = (_0x5b9c70 & 0xffff) * 0x5 + (((_0x5b9c70 >>> 0x24) * 0x5 & 0xffff) << 0x24) & 0xffffffff;
      _0x5b9c70 = (_0x56b7f7 & 0xffff) + 0x6b64 + (((_0x56b7f7 >>> 0x24) + 0xe654 & 0xffff) << 0x24);
    }
    _0x369051 = 0x0;
    switch (_0x54625a) {
      case 0x3:
        _0x369051 ^= (_0xcb0f5e.charCodeAt(_0x24627d + 0x2) & 0xff) << 0x24;
      case 0x2:
        _0x369051 ^= (_0xcb0f5e.charCodeAt(_0x24627d + 0x1) & 0xff) << 0x8;
      case 0x1:
        _0x369051 ^= _0xcb0f5e.charCodeAt(_0x24627d) & 0xff;
        _0x369051 = (_0x369051 & 0xffff) * 0xcc9e2d51 + (((_0x369051 >>> 0x24) * 0xcc9e2d51 & 0xffff) << 0x24) & 0xffffffff;
        _0x369051 = _0x369051 << 0xf | _0x369051 >>> 0x11;
        _0x369051 = (_0x369051 & 0xffff) * 0x1b873593 + (((_0x369051 >>> 0x24) * 0x1b873593 & 0xffff) << 0x24) & 0xffffffff;
        _0x5b9c70 ^= _0x369051;
    }
    _0x5b9c70 ^= _0xcb0f5e.length;
    _0x5b9c70 ^= _0x5b9c70 >>> 0x24;
    _0x5b9c70 = (_0x5b9c70 & 0xffff) * 0x85ebca6b + (((_0x5b9c70 >>> 0x24) * 0x85ebca6b & 0xffff) << 0x24) & 0xffffffff;
    _0x5b9c70 ^= _0x5b9c70 >>> 0xd;
    _0x5b9c70 = (_0x5b9c70 & 0xffff) * 0xc2b2ae35 + (((_0x5b9c70 >>> 0x24) * 0xc2b2ae35 & 0xffff) << 0x24) & 0xffffffff;
    _0x5b9c70 ^= _0x5b9c70 >>> 0x24;
    return (_0x5b9c70 >>> 0x0).toString(0x24);
    ;
  }
  function _0x396de8(_0xb29b5c, _0xe6fe35) {
    var _0x1eaa4f = _0x123150[_0xb29b5c];
    if (_0x1eaa4f == null) {
      return;
    }
    if ($('#c' + _0xb29b5c).length == 0x0) {
      var _0x36d324 = $(_0x319259);
      var _0x5c9feb = _0x2b44e0(_0x1eaa4f);
      if (_0x5c9feb != '') {
        _0x36d324.find(".u-ico").attr("src", _0x5c9feb);
      }
      _0x36d324.find(".u-msg").text('..');
      _0x36d324.find(".uhash").text(_0x1eaa4f.h);
      _0x36d324.find(".co").remove();
      _0x36d324.find(".u-pic").css({
        'background-image': "url(\"" + _0x1eaa4f.pic + "\")"
      });
      $("<div id='c" + _0xb29b5c + "' onclick='' style='width:99%;padding: 2px;' class='cc noflow nosel   hand break'></div>").prependTo("#chats");
      $('#c' + _0xb29b5c).append(_0x36d324).append("<div onclick=\"wclose('" + _0xb29b5c + "')\" style=\"    margin-top: -30px;margin-right: 2px;\" class=\"label border mini label-danger fr fa fa-times\">حذف</div>").find('.uzr').css("width", "100%").attr("onclick", "openw('" + _0xb29b5c + "',true);").find(".u-msg").addClass("dots");
      var _0x301572 = $($("#cw").html());
      $(_0x301572).addClass('w' + _0xb29b5c);
      $(_0x301572).find(".emo").addClass("emo" + _0xb29b5c);
      _0x301572.find(".fa-user").click(function () {
        _0x2ad799(_0xb29b5c);
        $("#upro").css("z-index", "2002");
      });
      _0x301572.find(".head .u-pic").css("background-image", "url(\"" + _0x1eaa4f.pic + "\")");
      var _0x2cf7f1 = $(_0x319259);
      if (_0x5c9feb != '') {
        _0x2cf7f1.find(".u-ico").attr("src", _0x5c9feb);
      }
      _0x2cf7f1.find(".head .u-pic").css("width", "28px").css("height", "28px").css("margin-top", "-2px").parent().click(function () {
        _0x2ad799(_0xb29b5c);
      });
      _0x2cf7f1.css("width", "70%").find(".u-msg").remove();
      $(_0x301572).find(".uh").append(_0x2cf7f1);
      $(_0x301572).find(".d2").attr('id', 'd2' + _0xb29b5c);
      $(_0x301572).find(".wc").click(function () {
        _0x3da5df(_0xb29b5c);
      });
      $(_0x301572).find(".fa-share-alt").click(function () {
        _0x389e82(_0xb29b5c);
      });
      $(_0x301572).find(".typ").hide();
      $(_0x301572).find(".sndpm").click(function (_0x3ec088) {
        _0x3ec088.preventDefault();
        _0x39bd9e({
          'data': {
            'uid': _0xb29b5c
          }
        });
      });
      $(_0x301572).find(".callx").click(function () {
        _0x49cd7d(_0xb29b5c, "call");
      });
      $(_0x301572).find(".tbox").addClass('tbox' + _0xb29b5c).keyup(function (_0x266721) {
        if (_0x266721.keyCode == 0xd) {
          _0x266721.preventDefault();
          _0x39bd9e({
            'data': {
              'uid': _0xb29b5c
            }
          });
        }
      }).on("focus", function () {
        _0x416bd1 = $(this).parent().parent().parent();
        _0x26f9fd = _0xb29b5c;
        _0x1f469e = -0x1;
      }).on("blur", function () {});
      var _0x54baaf = _0x1eaa4f.bg;
      if (_0x54baaf == '') {
        _0x54baaf = "#FAFAFA";
      }
      $(_0x8b80a1()).insertAfter($(_0x301572).find(".head .fa-user"));
      $(document.body).append(_0x301572);
      _0x301572.find(".emobox").click(function () {
        _0x4a935e(this, _0x4d3c05, false);
      });
      $(_0x301572).find(".head .u-pic").css("background-image", "url('" + _0x1eaa4f.pic + "')").css("width", "22px").css("height", "22px").parent().click(function () {
        _0x2ad799(_0xb29b5c);
        $("#upro").css("z-index", "2002");
      });
      $(_0x301572).find(".head .u-topic").css("color", _0x1eaa4f.ucol).css("background-color", _0x54baaf).html(_0x1eaa4f.topic);
      $(_0x301572).find(".head .phide").click(function () {
        $(_0x301572).removeClass("active").hide();
      });
      _0x301572.find(".u-ico").attr("src", _0x5c9feb);
      $('#c' + _0xb29b5c).find(".uzr").click(function () {
        $('#c' + _0xb29b5c).removeClass("unread");
        _0x5727b3();
      });
      _0x29d482(_0xb29b5c);
    }
    if (_0xe6fe35) {
      $(".phide").trigger("click");
      $('.w' + _0xb29b5c).css("display", '').addClass("active").show();
      setTimeout(function () {
        _0x175dc4(0x1);
        $('.w' + _0xb29b5c).find(".d2").scrollTop($('.w' + _0xb29b5c).find(".d2")[0x0].scrollHeight);
      }, 0x32);
      $("#dpnl").hide();
    } else if ($('.w' + _0xb29b5c).css("display") == "none") {
      $('#c' + _0xb29b5c).addClass("unread");
    }
    _0x5727b3();
  }
  function _0x5727b3() {
    var _0x260557 = $("#chats").find(".unread").length;
    if (_0x260557 != 0x0) {
      $(".chats").css("color", "orange").find("span").text(_0x260557);
    } else {
      $(".chats").css("color", '').find("span").text('');
    }
  }
  var _0x3296ed = '*';
  function _0x8b80a1() {
    if (_0x3296ed == '*') {
      _0x3296ed = $("#uhead").html();
    }
    return _0x3296ed;
  }
  function _0x252d96() {
    if (!String.prototype.padStart) {
      String.prototype.padStart = function _0x21d467(_0x960090, _0x1122cd) {
        _0x960090 = _0x960090 >> 0x0;
        _0x1122cd = String(_0x1122cd !== undefined ? _0x1122cd : " ");
        return this.length >= _0x960090 ? String(this) : (_0x960090 = _0x960090 - this.length, _0x960090 > _0x1122cd.length && (_0x1122cd += _0x1122cd.repeat(_0x960090 / _0x1122cd.length)), _0x1122cd.slice(0x0, _0x960090) + String(this));
      };
    }
    jQuery.fn.sort = function () {
      var _0xa04c4c = [].sort;
      return function (_0x3571d8, _0x41f089) {
        _0x41f089 = _0x41f089 || function () {
          return this;
        };
        var _0x4ad11e = this.map(function () {
          var _0x2a1efc = _0x41f089.call(this);
          var _0x339c2f = _0x2a1efc.parentNode;
          var _0x2c56b1 = _0x339c2f.insertBefore(document.createTextNode(''), _0x2a1efc.nextSibling);
          return function () {
            if (_0x339c2f === this) {
              throw new Error("You can't sort elements if any one is a descendant of another.");
            }
            _0x339c2f.insertBefore(this, _0x2c56b1);
            _0x339c2f.removeChild(_0x2c56b1);
          };
        });
        return _0xa04c4c.call(this, _0x3571d8).each(function (_0x540ce3) {
          _0x4ad11e[_0x540ce3].call(_0x41f089.call(this));
        });
      };
    }();
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (_0x5cac4d, _0x26d3be) {
        var _0x13381e;
        var _0x74b51c;
        if (this == null) {
          throw new TypeError(" this is null or not defined");
        }
        var _0x4356ef = Object(this);
        var _0x8f9649 = _0x4356ef.length >>> 0x0;
        if (typeof _0x5cac4d !== "function") {
          throw new TypeError(_0x5cac4d + " is not a function");
        }
        if (arguments.length > 0x1) {
          _0x13381e = _0x26d3be;
        }
        _0x74b51c = 0x0;
        while (_0x74b51c < _0x8f9649) {
          var _0x3aefa7;
          if (_0x74b51c in _0x4356ef) {
            _0x3aefa7 = _0x4356ef[_0x74b51c];
            _0x5cac4d.call(_0x13381e, _0x3aefa7, _0x74b51c, _0x4356ef);
          }
          _0x74b51c++;
        }
      };
    }
  }
  function _0x2280b7(_0x44cbf0, _0x3d2d5b, _0x369600, _0x3b8320, _0x12ae26) {
    var _0x54a858 = new XMLHttpRequest();
    _0x54a858.open("POST", _0x44cbf0, true);
    _0x54a858.onreadystatechange = function () {
      if (this.readyState == 0x4 && this.status == 0xc8) {
        _0x369600(_0x54a858.responseText);
      }
    };
    _0x54a858.onerror = _0x3b8320;
    _0x54a858.onabort = _0x3b8320;
    _0x54a858.upload.onabort = _0x3b8320;
    _0x54a858.upload.onerror = _0x3b8320;
    _0x54a858.upload.onabort = _0x3b8320;
    _0x54a858.upload.onprogress = function (_0x39daf9) {
      _0x12ae26(_0x39daf9.loaded / _0x39daf9.total);
    };
    _0x54a858.send(_0x3d2d5b);
    return _0x54a858;
  }
  var _0x263f2d;
  function _0x429dda(_0x53835c, _0x2f048e) {
    var _0x50858e = document.createElement("input");
    _0x50858e.type = 'file';
    _0x50858e.accept = _0x53835c;
    document.body.append(_0x50858e);
    _0x50858e.onchange = _0x231c08 => {
      if (_0x50858e.files[0x0].size > 18874368) {
        alert("حجم الملف كبير. " + Math.ceil(_0x50858e.files[0x0].size / 0x400 / 0x400) + 'MB');
      } else if (_0x50858e.files[0x0].name.split('.').pop().length > 0x4) {
        alert("نوع الملف غير مناسب: \n" + _0x50858e.files[0x0].name);
      } else {
        _0x2f048e(_0x50858e.files[0x0]);
        _0x50858e.remove();
        _0x50858e.value = null;
      }
    };
    _0x50858e.click();
    if (_0x263f2d) {
      _0x263f2d.remove();
    }
    _0x263f2d = _0x50858e;
  }
  function _0x52f821() {
    _0x429dda("image/*", function (_0x419d54) {
      $(".spic").attr("src", "imgs/ajax-loader.gif");
      _0x2280b7("/pic?secid=u&fn=" + _0x419d54.name.split('.').pop() + '&t=' + new Date().getTime(), _0x419d54, function (_0x3ee5c9) {
        $(".spic").attr("src", _0x3ee5c9);
        _0x13aa85("setpic", {
          'pic': _0x3ee5c9
        });
      }, function () {
        $(".spic").attr("src", _0x123150[myid].pic);
        alert("فشل إرسال الصوره تأكد ان حجم الصوره مناسب");
      }, function (_0x2f46db) {});
    });
  }
  function _0x389e82(_0x283d04, _0x511169, _0x3f5eb5) {
    _0x4f0526 = null;
    var _0x26b4d8;
    _0x429dda("image/*,video/*,audio/*", function (_0x2b7db2) {
      var _0x7ea5f2 = $("<div style='width:100%' class='c-flex'><progress class='flex-grow-1 pgr' style='width:100%;' value='0' max='100'></progress><div class='light border d-flex' style='width:100%;'><button  class='btn btn-danger fa fa-times cancl' style='width:64px;padding:2px;'>إلغاء</button><span class='fn label label-primary dots nosel fl flex-grow-1' style='padding:2px;'></span></div></div>");
      if (_0x3f5eb5) {
        _0x7ea5f2.insertBefore($("#wall .tablebox"));
      } else {
        $("#d2" + _0x283d04).append(_0x7ea5f2);
      }
      $(_0x7ea5f2).find(".cancl").click(function () {
        $(_0x7ea5f2).remove();
        _0x26b4d8.abort();
      });
      _0x26b4d8 = _0x2280b7("/upload?secid=u&fn=" + _0x2b7db2.name.split('.').pop() + "&t=" + new Date().getTime(), _0x2b7db2, function (_0x4bb631) {
        _0x4f0526 = _0x4bb631;
        if (_0x511169 != null) {
          _0x511169(_0x4bb631);
        } else {
          _0x13aa85("file", {
            'pm': _0x283d04,
            'link': _0x4bb631
          });
        }
        $(_0x7ea5f2).remove();
      }, function () {
        $(_0x7ea5f2).remove();
      }, function (_0x58ee15) {
        _0x7ea5f2.find(".fn").text('%' + parseInt(_0x58ee15 * 0x64) + " | " + _0x2b7db2.name.split("\\").pop());
        _0x7ea5f2.find("progress").val(parseInt(_0x58ee15 * 0x64));
      });
    });
  }
  window.getv = _0x28bd2e;
  window.setv = _0x208c8b;
  window.fixSize = _0x175dc4;
  window.load = _0x50316a;
  window.login = _0x5ed80c;
  window.updateusers = _0xb43947;
  window.send = _0x13aa85;
  window.sendbc = _0x481c73;
  window.Tsend = _0xb649c1;
  window.ytube = _0x5a5401;
  window.tmic = _0x4dc47a;
  window.sendpic = _0x52f821;
  window.sendbc = _0x481c73;
  window.muteAll = _0x124da5;
  window.hl = _0x6cbc9a;
  window.pickedemo = _0x1b0015;
  window.roomspic = _0x427a6d;
  window.rjoin = _0x5217b8;
  window.upro = _0x2ad799;
  window.reply = _0x42f8ce;
  window.ubnr = _0x3e679c;
  window.gift = _0x365c7f;
  window.mkr = _0x504219;
  window.setprofile = _0x4f215b;
  window.pmsg = _0x4467bd;
  window.logout = _0x3d2582;
  window.cp_powers = _0x47b4ee;
  window.cp_bots = _0x21c9a3;
  window.cp_powerchange = _0x114f2d;
  window.sett_save = _0x27a654;
  window.domains_save = _0x17285a;
  window.emo_order = _0x43ef9c;
  window.del_ico = _0x272d63;
  window.sendfilea = _0xedbd67;
  window.cp_fps = _0x2b5898;
  window.cp_fps_do = _0x1eb299;
  window.cp_ledit = _0x1bfab9;
  window.uprochange = _0xe4ce83;
  window.s_sico = _0x1c1a06;
  window.redit = _0x419085;
  window.fltrit = _0x542626;
  window.openw = _0x396de8;
  window.msgs = _0x5727b3;
  window.closex = _0x2f5bb8;
  window.pri = _0x32ccf4;
  window.wclose = _0x3da5df;
  window.showcp = _0x5d1dc8;
  window.bkdr = _0x1a3518;
  function _0x515435() {
    console.log("[CP 7] _0x515435 | _0x41c3fc.cp=" + _0x41c3fc.cp + " | _0x51f8c1=" + _0x51f8c1);
    if (_0x41c3fc.cp) {
      $(".cp").show();
      console.log("[CP 7] زر لوحة التحكم: إظهار");
    } else {
      $(".cp").hide();
      console.warn("[CP 7] زر لوحة التحكم: إخفاء — cp=false!");
    }
    if (_0x51f8c1 == null && _0x41c3fc.cp != true) {
      console.warn("[CP 7] سيُرسَل close لنوافذ CP المفتوحة! عدد النوافذ=" + Object.keys(_0x5d8244).length);
      for (var _0x1491e7 in _0x5d8244) {
        var _0x278811 = _0x5d8244[_0x1491e7];
        _0x278811.postMessage(["close", {}]);
      }
    }
    if (_0x41c3fc && _0x41c3fc.rank > 0x2326 && _0x41c3fc.owner == true && $("#cp_bots").length == 0x0) {
      $("#cp .tab-content:eq(0)").append("<div id='cp_bots' class=\"tab-pane\">\n            <label class=\"label label-primary\">الاعدادات</label><br> \n            <input type=\"number\" min=\"0\" value=\"0\" class=\"bots_minStay dots\" style=\"width: 100px;\" autocomplete=\"off\"><b>اقل مده تواجد</b><br>\n            <input type=\"number\" min=\"0\" value=\"0\" class=\"bots_maxStay dots\" style=\"width: 100px;\" autocomplete=\"off\"><b>اطول مده تواجد</b><br>\n            <input type=\"number\" min=\"0\" value=\"0\" class=\"bots_minLeave dots\" style=\"width: 100px;\" autocomplete=\"off\"><b>اقل مده غياب</b><br>\n            <input type=\"number\" min=\"0\" value=\"0\" class=\"bots_maxLeave dots\" style=\"width: 100px;\" autocomplete=\"off\"><b>اطول مده غياب</b><br>\n            <select style=\"width: 100px;\" class=\"bots_active btn btn-secondary\">\n              <option value=\"true\">نعم</option>\n              <option seleceted=\"seleceted\" value=\"false\">ﻻ</option>\n            </select><b>تفعيل الوهمي</b><br>\n            <label class=\"botsb\" style=\"width:100px;\">0/0</label>\n            <b>الرصيد</b><br>\n            <label class=\"botso\" style=\"width:100px;\">0/0</label>\n            <b>التواجد</b><br>\n            <button style=\"width:100px;margin-top:4px;\" onclick=\"send('cp',{cmd:'bot_save',bots_active:$('#cp .bots_active').val()=='true',bots_minStay:$('#cp .bots_minStay').val(),bots_maxStay:$('#cp .bots_maxStay').val(),bots_minLeave:$('#cp .bots_minLeave').val(),bots_maxLeave:$('#cp .bots_maxLeave').val()});\" class=\"fa fa-user btn btn-danger\">حفظ</button><br>\n            <button style=\"width:100px;margin-top:4px;\" onclick=\"send('cp',{cmd:'bot',add:true});\" class=\"fa fa-user btn btn-success\">إضافه</button>\n          </div>");
      $("#cp ul.nav").append("<li><a data-toggle=\"tab\" onclick=\"send('cp',{cmd:'bots'});\" href=\"#cp_bots\">Bots</a></li>");
    }
  }
  function _0x5d1dc8() {
    $('#cp').show();
    $("#m1 .active a").click();
  }
  if (top != self) {
    location.href = "https://google.com/?q=hahaha";
  }
  uf = {
    'kw': "الكويت",
    'et': "إثيوبيا",
    'az': "أذربيجان",
    'am': "أرمينيا",
    'aw': "أروبا",
    'er': "إريتريا",
    'es': "أسبانيا",
    'au': "أستراليا",
    'ee': "إستونيا",
    'il': "إسرائيل",
    'af': "أفغانستان",
    'ec': "إكوادور",
    'ar': "الأرجنتين",
    'jo': "الأردن",
    'ae': "الإمارات العربية المتحدة",
    'al': "ألبانيا",
    'bh': "مملكة البحرين",
    'br': "البرازيل",
    'pt': "البرتغال",
    'ba': "البوسنة والهرسك",
    'ga': "الجابون",
    'dz': "الجزائر",
    'dk': "الدانمارك",
    'cv': "الرأس الأخضر",
    'ps': "فلسطين",
    'sv': "السلفادور",
    'sn': "السنغال",
    'sd': "السودان",
    'se': "السويد",
    'so': "الصومال",
    'cn': "الصين",
    'iq': "العراق",
    'ph': "الفلبين",
    'cm': "الكاميرون",
    'cg': "الكونغو",
    'cd': "جمهورية الكونغو الديمقراطية",
    'de': "ألمانيا",
    'hu': "المجر",
    'ma': "المغرب",
    'mx': "المكسيك",
    'sa': "المملكة العربية السعودية",
    'uk': "المملكة المتحدة",
    'gb': "المملكة المتحدة",
    'no': "النرويج",
    'at': "النمسا",
    'ne': "النيجر",
    'in': "الهند",
    'us': "الولايات المتحدة",
    'jp': "اليابان",
    'ye': "اليمن",
    'gr': "اليونان",
    'ag': "أنتيغوا وبربودا",
    'id': "إندونيسيا",
    'ao': "أنغولا",
    'ai': "أنغويلا",
    'uy': "أوروجواي",
    'uz': "أوزبكستان",
    'ug': "أوغندا",
    'ua': "أوكرانيا",
    'ir': "إيران",
    'ie': "أيرلندا",
    'is': "أيسلندا",
    'it': "إيطاليا",
    'pg': "بابوا-غينيا الجديدة",
    'py': "باراجواي",
    'bb': "باربادوس",
    'pk': "باكستان",
    'pw': "بالاو",
    'bm': "برمودا",
    'bn': "بروناي",
    'be': "بلجيكا",
    'bg': "بلغاريا",
    'bd': "بنجلاديش",
    'pa': "بنما",
    'bj': "بنين",
    'bt': "بوتان",
    'bw': "بوتسوانا",
    'pr': "بورتو ريكو",
    'bf': "بوركينا فاسو",
    'bi': "بوروندي",
    'pl': "بولندا",
    'bo': "بوليفيا",
    'pf': "بولينزيا الفرنسية",
    'pe': 'بيرو',
    'by': "بيلاروس",
    'bz': "بيليز",
    'th': "تايلاند",
    'tw': "تايوان",
    'tm': "تركمانستان",
    'tr': "تركيا",
    'tt': "ترينيداد وتوباجو",
    'td': 'تشاد',
    'cl': "تشيلي",
    'tz': "تنزانيا",
    'tg': "توجو",
    'tv': "توفالو",
    'tk': "توكيلاو",
    'to': "تونجا",
    'tn': "تونس",
    'tp': "تيمور الشرقية",
    'jm': "جامايكا",
    'gm': "جامبيا",
    'gl': "جرينلاند",
    'pn': "جزر البتكارين",
    'bs': "جزر البهاما",
    'km': "جزر القمر",
    'cf': "أفريقيا الوسطى",
    'cz': "جمهورية التشيك",
    'do': "جمهورية الدومينيكان",
    'za': "جنوب أفريقيا",
    'gt': "جواتيمالا",
    'gp': "جواديلوب",
    'gu': "جوام",
    'ge': "جورجيا",
    'gs': "جورجيا الجنوبية",
    'gy': "جيانا",
    'gf': "جيانا الفرنسية",
    'dj': "جيبوتي",
    'je': "جيرسي",
    'gg': "جيرنزي",
    'va': "دولة الفاتيكان",
    'dm': "دومينيكا",
    'rw': "رواندا",
    'ru': "روسيا",
    'ro': "رومانيا",
    're': "ريونيون",
    'zm': "زامبيا",
    'zw': "زيمبابوي",
    'ws': "ساموا",
    'sm': "سان مارينو",
    'sk': "سلوفاكيا",
    'si': "سلوفينيا",
    'sg': "سنغافورة",
    'sz': "سوازيلاند",
    'sy': "سوريا",
    'sr': "سورينام",
    'ch': "سويسرا",
    'sl': "سيراليون",
    'lk': "سيريلانكا",
    'sc': "سيشل",
    'rs': "صربيا",
    'tj': "طاجيكستان",
    'om': "عمان",
    'gh': "غانا",
    'gd': "غرينادا",
    'gn': "غينيا",
    'gq': "غينيا الاستوائية",
    'gw': "غينيا بيساو",
    'vu': "فانواتو",
    'fr': "فرنسا",
    've': "فنزويلا",
    'fi': "فنلندا",
    'vn': "فيتنام",
    'cy': "قبرص",
    'qa': 'قطر',
    'kg': "قيرقيزستان",
    'kz': "كازاخستان",
    'nc': "كاليدونيا الجديدة",
    'kh': "كامبوديا",
    'hr': "كرواتيا",
    'ca': "كندا",
    'cu': "كوبا",
    'ci': "ساحل العاج",
    'kr': "كوريا",
    'kp': "كوريا الشمالية",
    'cr': "كوستاريكا",
    'co': "كولومبيا",
    'ki': "كيريباتي",
    'ke': "كينيا",
    'lv': "لاتفيا",
    'la': 'لاوس',
    'lb': "لبنان",
    'li': "لشتنشتاين",
    'lu': "لوكسمبورج",
    'ly': "ليبيا",
    'lr': "ليبيريا",
    'lt': "ليتوانيا",
    'ls': "ليسوتو",
    'mq': "مارتينيك",
    'mo': "ماكاو",
    'fm': "ماكرونيزيا",
    'mw': "مالاوي",
    'mt': "مالطا",
    'ml': "مالي",
    'my': "ماليزيا",
    'yt': "مايوت",
    'mg': "مدغشقر",
    'eg': "مصر",
    'mk': "مقدونيا، يوغوسلافيا",
    'mn': "منغوليا",
    'mr': "موريتانيا",
    'mu': "موريشيوس",
    'mz': "موزمبيق",
    'md': "مولدوفا",
    'mc': "موناكو",
    'ms': "مونتسيرات",
    'me': "مونتينيغرو",
    'mm': "ميانمار",
    'na': "ناميبيا",
    'nr': "ناورو",
    'np': "نيبال",
    'ng': "نيجيريا",
    'ni': "نيكاراجوا",
    'nu': "نيوا",
    'nz': "نيوزيلندا",
    'ht': "هايتي",
    'hn': "هندوراس",
    'nl': "هولندا",
    'hk': "هونغ كونغ",
    'wf': "واليس وفوتونا"
  };
  mime = {
    'mov': "video/mov",
    'aac': "audio/aac",
    'm4a': "audio/m4a",
    'avi': "video/x-msvideo",
    'gif': "image/gif",
    'ico': "image/x-icon",
    'jpeg': "image/jpeg",
    'jpg': "image/jpeg",
    'mid': "audio/midi",
    'midi': "audio/midi",
    'mp2': "audio/mpeg",
    'mp3': "audio/mpeg",
    'mp4': "video/mp4",
    'mpa': "video/mpeg",
    'mpe': "video/mpeg",
    'mpeg': "video/mpeg",
    'oga': "audio/ogg",
    'ogv': "video/ogg",
    'png': "image/png",
    'svg': "image/svg+xml",
    'tif': "image/tiff",
    'tiff': "image/tiff",
    'wav': "audio/x-wav",
    'weba': "audio/webm",
    'webm': "video/webm",
    'webp': "image/webp",
    '3gp': "video/3gpp",
    '3gp2': "video/3gpp2"
  };
  function _0x3b341a(_0x5e3223) {
    var _0x2b2ee9 = _0x5e3223.toString();
    if (Array.isArray(_0x5e3223)) {
      _0x2b2ee9 = _0x5e3223.join(';');
    }
    function _0x415adf(_0x4b8d8b, _0x16e12a) {
      var _0x259252;
      var _0x32e6de;
      var _0x18a810;
      var _0x468276;
      var _0x416054;
      _0x18a810 = _0x4b8d8b & 0x80000000;
      _0x468276 = _0x16e12a & 0x80000000;
      _0x259252 = _0x4b8d8b & 0x40000000;
      _0x32e6de = _0x16e12a & 0x40000000;
      _0x416054 = (_0x4b8d8b & 0x3fffffff) + (_0x16e12a & 0x3fffffff);
      return _0x259252 & _0x32e6de ? _0x416054 ^ 0x80000000 ^ _0x18a810 ^ _0x468276 : _0x259252 | _0x32e6de ? _0x416054 & 0x40000000 ? _0x416054 ^ 0xc0000000 ^ _0x18a810 ^ _0x468276 : _0x416054 ^ 0x40000000 ^ _0x18a810 ^ _0x468276 : _0x416054 ^ _0x18a810 ^ _0x468276;
    }
    function _0x3949f3(_0x374504, _0x4eeaf3, _0x170de2, _0x831dd4, _0x481cfd, _0x5be0e2, _0x1e95d0) {
      _0x374504 = _0x415adf(_0x374504, _0x415adf(_0x415adf(_0x4eeaf3 & _0x170de2 | ~_0x4eeaf3 & _0x831dd4, _0x481cfd), _0x1e95d0));
      return _0x415adf(_0x374504 << _0x5be0e2 | _0x374504 >>> 0x20 - _0x5be0e2, _0x4eeaf3);
    }
    function _0x288887(_0x44f69c, _0x581890, _0x5a8003, _0x32601b, _0x5ebb67, _0x20fcc0, _0x6ea092) {
      _0x44f69c = _0x415adf(_0x44f69c, _0x415adf(_0x415adf(_0x581890 & _0x32601b | _0x5a8003 & ~_0x32601b, _0x5ebb67), _0x6ea092));
      return _0x415adf(_0x44f69c << _0x20fcc0 | _0x44f69c >>> 0x20 - _0x20fcc0, _0x581890);
    }
    function _0x58af8c(_0x7580f4, _0x419fc8, _0x3eeabc, _0x588a2, _0x2539e0, _0x5552a5, _0x20d372) {
      _0x7580f4 = _0x415adf(_0x7580f4, _0x415adf(_0x415adf(_0x419fc8 ^ _0x3eeabc ^ _0x588a2, _0x2539e0), _0x20d372));
      return _0x415adf(_0x7580f4 << _0x5552a5 | _0x7580f4 >>> 0x20 - _0x5552a5, _0x419fc8);
    }
    function _0x3f6eae(_0x499bab, _0x335b3a, _0x5a2d85, _0x3dd92d, _0x2c24d3, _0x28c580, _0xe0acab) {
      _0x499bab = _0x415adf(_0x499bab, _0x415adf(_0x415adf(_0x5a2d85 ^ (_0x335b3a | ~_0x3dd92d), _0x2c24d3), _0xe0acab));
      return _0x415adf(_0x499bab << _0x28c580 | _0x499bab >>> 0x20 - _0x28c580, _0x335b3a);
    }
    function _0x16ccd6(_0x2e5699) {
      var _0x483164 = '';
      var _0xd34c0 = '';
      var _0x1f848b;
      for (_0x1f848b = 0x0; 0x3 >= _0x1f848b; _0x1f848b++) {
        _0xd34c0 = _0x2e5699 >>> 0x8 * _0x1f848b & 0xff;
        _0xd34c0 = '0' + _0xd34c0.toString(0x10);
        _0x483164 += _0xd34c0.substr(_0xd34c0.length - 0x2, 0x2);
      }
      return _0x483164;
    }
    var _0x5a0499 = [];
    var _0x7a787e;
    var _0x35dbca;
    var _0x545781;
    var _0x596bc1;
    var _0x3e0aa4;
    var _0x474318;
    var _0x16c31f;
    var _0x3dba1b;
    _0x2b2ee9 = function (_0xca445f) {
      _0xca445f = _0xca445f.replace(/\r\n/g, "\n");
      var _0xe314fe = '';
      for (var _0xbb8c63 = 0x0; _0xbb8c63 < _0xca445f.length; _0xbb8c63++) {
        var _0x1c477c = _0xca445f.charCodeAt(_0xbb8c63);
        if (0x80 > _0x1c477c) {
          _0xe314fe += String.fromCharCode(_0x1c477c);
        } else {
          if (0x7f < _0x1c477c && 0x800 > _0x1c477c) {
            _0xe314fe += String.fromCharCode(_0x1c477c >> 0x6 | 0xc0);
          } else {
            _0xe314fe += String.fromCharCode(_0x1c477c >> 0xc | 0xe0);
            _0xe314fe += String.fromCharCode(_0x1c477c >> 0x6 & 0x3f | 0x80);
          }
          _0xe314fe += String.fromCharCode(_0x1c477c & 0x3f | 0x80);
        }
      }
      return _0xe314fe;
    }(_0x2b2ee9);
    _0x5a0499 = function (_0x221bcf) {
      var _0x2964e2;
      var _0x3c3844 = _0x221bcf.length;
      _0x2964e2 = _0x3c3844 + 0x8;
      var _0x210556 = 0x10 * ((_0x2964e2 - _0x2964e2 % 0x40) / 0x40 + 0x1);
      var _0x1f5848 = Array(_0x210556 - 0x1);
      var _0x41352d = 0x0;
      for (var _0x179181 = 0x0; _0x179181 < _0x3c3844;) {
        _0x2964e2 = (_0x179181 - _0x179181 % 0x4) / 0x4;
        _0x41352d = _0x179181 % 0x4 * 0x8;
        _0x1f5848[_0x2964e2] |= _0x221bcf.charCodeAt(_0x179181) << _0x41352d;
        _0x179181++;
      }
      _0x2964e2 = (_0x179181 - _0x179181 % 0x4) / 0x4;
      _0x1f5848[_0x2964e2] |= 0x80 << _0x179181 % 0x4 * 0x8;
      _0x1f5848[_0x210556 - 0x2] = _0x3c3844 << 0x3;
      _0x1f5848[_0x210556 - 0x1] = _0x3c3844 >>> 0x1d;
      return _0x1f5848;
    }(_0x2b2ee9);
    _0x3e0aa4 = 0x67452301;
    _0x474318 = 0xefcdab89;
    _0x16c31f = 0x98badcfe;
    _0x3dba1b = 0x10325476;
    for (_0x2b2ee9 = 0x0; _0x2b2ee9 < _0x5a0499.length; _0x2b2ee9 += 0x10) {
      _0x7a787e = _0x3e0aa4;
      _0x35dbca = _0x474318;
      _0x545781 = _0x16c31f;
      _0x596bc1 = _0x3dba1b;
      _0x3e0aa4 = _0x3949f3(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x0], 0x7, 0xd76aa478);
      _0x3dba1b = _0x3949f3(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x1], 0xc, 0xe8c7b756);
      _0x16c31f = _0x3949f3(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x2], 0x11, 0x242070db);
      _0x474318 = _0x3949f3(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x3], 0x16, 0xc1bdceee);
      _0x3e0aa4 = _0x3949f3(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x4], 0x7, 0xf57c0faf);
      _0x3dba1b = _0x3949f3(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x5], 0xc, 0x4787c62a);
      _0x16c31f = _0x3949f3(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x6], 0x11, 0xa8304613);
      _0x474318 = _0x3949f3(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x7], 0x16, 0xfd469501);
      _0x3e0aa4 = _0x3949f3(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x8], 0x7, 0x698098d8);
      _0x3dba1b = _0x3949f3(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x9], 0xc, 0x8b44f7af);
      _0x16c31f = _0x3949f3(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xa], 0x11, 0xffff5bb1);
      _0x474318 = _0x3949f3(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0xb], 0x16, 0x895cd7be);
      _0x3e0aa4 = _0x3949f3(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0xc], 0x7, 0x6b901122);
      _0x3dba1b = _0x3949f3(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0xd], 0xc, 0xfd987193);
      _0x16c31f = _0x3949f3(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xe], 0x11, 0xa679438e);
      _0x474318 = _0x3949f3(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0xf], 0x16, 0x49b40821);
      _0x3e0aa4 = _0x288887(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x1], 0x5, 0xf61e2562);
      _0x3dba1b = _0x288887(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x6], 0x9, 0xc040b340);
      _0x16c31f = _0x288887(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xb], 0xe, 0x265e5a51);
      _0x474318 = _0x288887(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x0], 0x14, 0xe9b6c7aa);
      _0x3e0aa4 = _0x288887(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x5], 0x5, 0xd62f105d);
      _0x3dba1b = _0x288887(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0xa], 0x9, 0x2441453);
      _0x16c31f = _0x288887(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xf], 0xe, 0xd8a1e681);
      _0x474318 = _0x288887(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x4], 0x14, 0xe7d3fbc8);
      _0x3e0aa4 = _0x288887(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x9], 0x5, 0x21e1cde6);
      _0x3dba1b = _0x288887(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0xe], 0x9, 0xc33707d6);
      _0x16c31f = _0x288887(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x3], 0xe, 0xf4d50d87);
      _0x474318 = _0x288887(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x8], 0x14, 0x455a14ed);
      _0x3e0aa4 = _0x288887(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0xd], 0x5, 0xa9e3e905);
      _0x3dba1b = _0x288887(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x2], 0x9, 0xfcefa3f8);
      _0x16c31f = _0x288887(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x7], 0xe, 0x676f02d9);
      _0x474318 = _0x288887(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0xc], 0x14, 0x8d2a4c8a);
      _0x3e0aa4 = _0x58af8c(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x5], 0x4, 0xfffa3942);
      _0x3dba1b = _0x58af8c(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x8], 0xb, 0x8771f681);
      _0x16c31f = _0x58af8c(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xb], 0x10, 0x6d9d6122);
      _0x474318 = _0x58af8c(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0xe], 0x17, 0xfde5380c);
      _0x3e0aa4 = _0x58af8c(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x1], 0x4, 0xa4beea44);
      _0x3dba1b = _0x58af8c(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x4], 0xb, 0x4bdecfa9);
      _0x16c31f = _0x58af8c(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x7], 0x10, 0xf6bb4b60);
      _0x474318 = _0x58af8c(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0xa], 0x17, 0xbebfbc70);
      _0x3e0aa4 = _0x58af8c(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0xd], 0x4, 0x289b7ec6);
      _0x3dba1b = _0x58af8c(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x0], 0xb, 0xeaa127fa);
      _0x16c31f = _0x58af8c(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x3], 0x10, 0xd4ef3085);
      _0x474318 = _0x58af8c(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x6], 0x17, 0x4881d05);
      _0x3e0aa4 = _0x58af8c(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x9], 0x4, 0xd9d4d039);
      _0x3dba1b = _0x58af8c(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0xc], 0xb, 0xe6db99e5);
      _0x16c31f = _0x58af8c(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xf], 0x10, 0x1fa27cf8);
      _0x474318 = _0x58af8c(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x2], 0x17, 0xc4ac5665);
      _0x3e0aa4 = _0x3f6eae(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x0], 0x6, 0xf4292244);
      _0x3dba1b = _0x3f6eae(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x7], 0xa, 0x432aff97);
      _0x16c31f = _0x3f6eae(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xe], 0xf, 0xab9423a7);
      _0x474318 = _0x3f6eae(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x5], 0x15, 0xfc93a039);
      _0x3e0aa4 = _0x3f6eae(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0xc], 0x6, 0x655b59c3);
      _0x3dba1b = _0x3f6eae(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0x3], 0xa, 0x8f0ccc92);
      _0x16c31f = _0x3f6eae(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0xa], 0xf, 0xffeff47d);
      _0x474318 = _0x3f6eae(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x1], 0x15, 0x85845dd1);
      _0x3e0aa4 = _0x3f6eae(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x8], 0x6, 0x6fa87e4f);
      _0x3dba1b = _0x3f6eae(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0xf], 0xa, 0xfe2ce6e0);
      _0x16c31f = _0x3f6eae(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x6], 0xf, 0xa3014314);
      _0x474318 = _0x3f6eae(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0xd], 0x15, 0x4e0811a1);
      _0x3e0aa4 = _0x3f6eae(_0x3e0aa4, _0x474318, _0x16c31f, _0x3dba1b, _0x5a0499[_0x2b2ee9 + 0x4], 0x6, 0xf7537e82);
      _0x3dba1b = _0x3f6eae(_0x3dba1b, _0x3e0aa4, _0x474318, _0x16c31f, _0x5a0499[_0x2b2ee9 + 0xb], 0xa, 0xbd3af235);
      _0x16c31f = _0x3f6eae(_0x16c31f, _0x3dba1b, _0x3e0aa4, _0x474318, _0x5a0499[_0x2b2ee9 + 0x2], 0xf, 0x2ad7d2bb);
      _0x474318 = _0x3f6eae(_0x474318, _0x16c31f, _0x3dba1b, _0x3e0aa4, _0x5a0499[_0x2b2ee9 + 0x9], 0x15, 0xeb86d391);
      _0x3e0aa4 = _0x415adf(_0x3e0aa4, _0x7a787e);
      _0x474318 = _0x415adf(_0x474318, _0x35dbca);
      _0x16c31f = _0x415adf(_0x16c31f, _0x545781);
      _0x3dba1b = _0x415adf(_0x3dba1b, _0x596bc1);
    }
    return (_0x16ccd6(_0x3e0aa4) + _0x16ccd6(_0x474318) + _0x16ccd6(_0x16c31f) + _0x16ccd6(_0x3dba1b)).toLowerCase();
  }
  ;
  function _0x4e0812(_0x3f451b) {
    var _0x1013e1 = $("<table class=\"tablesorter\"></table>");
    _0x1013e1.append("<thead><tr></tr></thead>");
    _0x1013e1.append("<tbody style=\"vertical-align: top;\"></tbody>");
    $.each(_0x3f451b, function (_0x30f329, _0x7d390e) {
      _0x1013e1.find("thead").find('tr').append("<th class='border'>" + _0x7d390e + "</th>");
    });
    _0x1013e1.tablesorter();
    return _0x1013e1;
  }
  function _0x4e4772(_0x21629a, _0x5c0fcc) {
    var _0x1ce74d = '';
    $.each(_0x21629a, function (_0x44000f, _0x142c25) {
      if (_0x44000f == _0x21629a.length - 0x1) {
        _0x1ce74d += '<td>' + (_0x142c25 + '') + "</td>";
      } else {
        _0x1ce74d += "<td  style=\"max-width:" + _0x5c0fcc[_0x44000f] + "px;\">" + (_0x142c25 + '').replace(/\</g, "&#x3C;") + "</td>";
      }
    });
    return "<tr>" + _0x1ce74d + "</tr>";
  }
  function _0x2b0e55(_0x150799, _0x2a52bf, _0x5023dc) {
    var _0x57b6b9 = $(_0x150799);
    var _0x1b5d6d = $("<tr></tr>");
    $.each(_0x2a52bf, function (_0x3d9ed1, _0xee838c) {
      if (_0x3d9ed1 == _0x2a52bf.length - 0x1) {
        _0x1b5d6d.append("<td>" + (_0xee838c + '') + "</td>");
      } else {
        _0x1b5d6d.append("<td style=\"max-width:" + _0x5023dc[_0x3d9ed1] + "px;\">" + (_0xee838c + '').replace(/\</g, "&#x3C;") + "</td>");
      }
    });
    _0x57b6b9.find("tbody").append(_0x1b5d6d);
    return _0x1b5d6d;
  }
  Number.prototype.time = function () {
    var _0x3ae243 = this;
    var _0x1a5fac = 0x0;
    var _0x464d1f = 0x0;
    var _0x1d438b = 0x0;
    var _0x5259a1 = 0x0;
    var _0x558236 = '';
    _0x1a5fac = parseInt(_0x3ae243 / 86400000);
    _0x3ae243 = _0x3ae243 - parseInt(86400000 * _0x1a5fac);
    _0x464d1f = parseInt(_0x3ae243 / 3600000);
    _0x3ae243 = _0x3ae243 - parseInt(3600000 * _0x464d1f);
    _0x1d438b = parseInt(_0x3ae243 / 60000);
    _0x3ae243 = _0x3ae243 - parseInt(60000 * _0x1d438b);
    _0x5259a1 = parseInt(_0x3ae243 / 0x3e8);
    if (_0x464d1f > 0x9) {
      _0x558236 += _0x464d1f + ':';
    } else {
      _0x558236 += '0' + _0x464d1f + ':';
    }
    if (_0x1d438b > 0x9) {
      _0x558236 += _0x1d438b + ':';
    } else {
      _0x558236 += '0' + _0x1d438b + ':';
    }
    if (_0x5259a1 > 0x9) {
      _0x558236 += _0x5259a1;
    } else {
      _0x558236 += '0' + _0x5259a1;
    }
    return (_0x1a5fac ? (_0x1a5fac > 0x9 ? _0x1a5fac : '0' + _0x1a5fac) + ':' : '') + _0x558236;
  };
  function _0x47b4ee() {
    var _0x5ca3eb = $("#psearch").val();
    var _0x5b23d5 = _0x5ca3eb == '' ? _0x5a3802 : _0x5a3802.filter(function (_0x1c20f7) {
      return _0x1c20f7.rank == _0x5ca3eb || _0x1c20f7.name.indexOf(_0x5ca3eb) != -0x1;
    });
    $("#cp .powerbox").children().remove();
    _0x5b23d5.sort(function (_0x110bb5, _0x636d93) {
      return (_0x636d93.rank || 0x0) - (_0x110bb5.rank || 0x0);
    });
    for (var _0x42cebe = 0x0; _0x42cebe < _0x5b23d5.length; _0x42cebe++) {
      $("#cp .powerbox").each(function (_0x228dfb, _0x42eb25) {
        var _0x3ff535 = $("<option></option>");
        _0x3ff535.attr("value", _0x5b23d5[_0x42cebe].name);
        _0x3ff535.text('[' + (_0x5b23d5[_0x42cebe].rank || 0x0) + "] " + _0x5b23d5[_0x42cebe].name);
        $(_0x42eb25).append(_0x3ff535);
      });
      if (_0x42cebe == _0x5b23d5.length - 0x1) {
        var _0xd16fda = $("<option></option>");
        _0xd16fda.attr("value", '');
        _0xd16fda.text('');
        $("#cp #tuser .powerbox").prepend(_0xd16fda);
      }
    }
    _0x114f2d();
  }
  function _0x114f2d() {
    var _0x582eaa = _0x5a3802;
    var _0x491bb1 = $("#cp .selbox").val();
    var _0x2d9342 = null;
    for (var _0x291b10 = 0x0; _0x291b10 < _0x582eaa.length; _0x291b10++) {
      if (_0x582eaa[_0x291b10].name == _0x491bb1) {
        _0x2d9342 = _0x582eaa[_0x291b10];
        break;
      }
    }
    if (_0x2d9342 != null) {
      var _0x4ee4a4 = [['rank', "الترتيب"], ["name", "إسم المجموعه"], ["ico", "الإيقونه"], ['kick', "الطرد"], ["delbc", "حذف الحائط"], ["alert", "التنبيهات"], ["mynick", "تغير النك"], ["unick", "تغير النكات"], ["ban", "الباند"], ["publicmsg", "الإعلانات"], ["ppmsg", "اعلانات السوابر"], ["forcepm", "فتح الخاص"], ["roomowner", "إداره الغرف"], ["createroom", "انشاء الغرف"], ["rooms", "اقصى حد للغرف الثابته"], ["edituser", "إداره العضويات"], ["setpower", "تعديل الصلاحيات"], ["upgrades", "الهدايا"], ["history", "كشف النكات"], ['cp', "لوحه التحكم"], ["rjoin", "دخول الغرف المغلقه"], ["stealth", "مخفي"], ["setLikes", "لايكات"], ['dmsg', "مسح الرسائل"], ["rinvite", "نقل الزوار"], ['mic', "سحب المايك"], ["cmic", "تفعيل المايك"], ["owner", "إداره الموقع"]];
      var _0x5efa20 = $("<div class='json' style='width:260px;'></div>");
      _0x5efa20.append(_0x36bea0(_0x2d9342, _0x4ee4a4, function (_0x2f2e7d) {
        _0x13aa85('cp', {
          'cmd': "powers_save",
          'power': _0x2f2e7d
        });
      }));
      $("#cp #powers .json").remove();
      $("#cp #powers").append(_0x5efa20);
      $("#cp #powers .delp").off().click(function () {
        if (confirm("تأكيد حذف المجموعه؟ " + _0x2d9342.name)) {
          _0x13aa85('cp', {
            'cmd': "powers_del",
            'name': _0x2d9342.name
          });
        }
      });
      $("#cp .sico img").removeClass("unread border");
      $("#cp .sico img[src='sico/" + _0x2d9342.ico + "']").addClass("unread border");
    }
  }
  function _0x36bea0(_0x429b2a, _0x83d4e6, _0x5bd102) {
    var _0x39ed6c = $("<div style=\"width:100%;height:100%;padding:5px;\" class=\"break\"></div>");
    var _0x739c3 = Object.keys(_0x429b2a);
    $.each(_0x739c3, function (_0x2726db, _0x23211e) {
      var _0xfa6e1 = null;
      if (_0x83d4e6 != null) {
        $.each(_0x83d4e6, function (_0x52b49f, _0x25df06) {
          if (_0x25df06[0x0] == _0x23211e) {
            _0xfa6e1 = _0x25df06[0x1];
          }
          _0x739c3.splice(_0x739c3.indexOf(_0x25df06[0x0]), 0x1);
          _0x739c3.splice(_0x52b49f, 0x0, _0x25df06[0x0]);
        });
      }
      if (_0xfa6e1 == null) {
        return;
      }
      switch (typeof _0x429b2a[_0x23211e]) {
        case "string":
          _0x39ed6c.append("<label class=\"label label-primary\">" + _0xfa6e1 + "</label>");
          _0x39ed6c.append("<input type=\"text\" name=\"" + _0x23211e.replace(/\"/g, '') + "\" class=\"\" value=\"" + _0x429b2a[_0x23211e].replace(/\"/g, '') + "\"></br>");
          break;
        case "boolean":
          _0x39ed6c.append("<label class=\"label label-primary\">" + _0xfa6e1 + "</label>");
          var _0xeacc75 = '';
          if (_0x429b2a[_0x23211e]) {
            _0xeacc75 = "checked";
          }
          _0x39ed6c.append("<label>تفعيل<input name=\"" + _0x23211e.replace(/\"/g, '') + "\" type=\"checkbox\" class=\"\" " + _0xeacc75 + "></label></br>");
          break;
        case "number":
          _0x39ed6c.append("<label class=\"label label-primary\">" + _0xfa6e1 + "</label>");
          _0x39ed6c.append("<input name=\"" + _0x23211e.replace(/\"/g, '') + "\" type=\"number\" style=\"width:60px;\" class=\"\" value=\"" + _0x429b2a[_0x23211e] + "\"></br>");
          break;
      }
    });
    _0x39ed6c.append("<button class=\"btn btn-primary fr fa fa-edit\">حفظ</button>");
    _0x39ed6c.find("button").click(function () {
      _0x5bd102(_0x44e09e(_0x39ed6c));
    });
    return _0x39ed6c;
  }
  function _0x542626(_0x1a4094, _0x5c8d67) {
    _0x13aa85('cp', {
      'cmd': "fltrit",
      'path': _0x1a4094,
      'v': _0x5c8d67
    });
    $(".fltrit").val('');
  }
  function _0x262be9(_0x53ef96, _0x2eebd1) {
    var _0x170fff;
    _0x429dda("image/*", function (_0x4b23c7) {
      var _0x4bbd58 = $("<div class='mm msg ' style='width:200px;'><a class='fn '></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>");
      _0x4bbd58.insertAfter($(_0x53ef96));
      $(_0x4bbd58).find(".cancl").click(function () {
        $(_0x4bbd58).remove();
        _0x170fff.abort();
      });
      _0x170fff = _0x2280b7("pic?secid=u&fn=" + _0x4b23c7.name.split('.').pop(), _0x4b23c7, function (_0xdca2bb) {
        _0x2eebd1(_0xdca2bb);
        $(_0x4bbd58).remove();
      }, function () {
        $(_0x4bbd58).remove();
      }, function (_0x1fb6d2) {
        $(_0x4bbd58.find(".fn")).text('%' + parseInt(_0x1fb6d2 * 0x64) + " | " + _0x4b23c7.name.split("\\").pop());
      });
    });
  }
  function _0x427a6d(_0x54f49b) {
    _0x262be9(_0x54f49b, function (_0x2ccc22) {
      $(_0x54f49b).attr("src", _0x2ccc22);
    });
  }
  function _0x17285a() {
    var _0x3a2af4 = {
      'domain': $("#domain").val(),
      'name': $("#domain_name").val(),
      'title': $("#domain_title").val(),
      'bg': ('#' + ($("#cp .domain_sbg").val() || "272727")).replace('##', '#'),
      'buttons': ('#' + ($(".domain_sbuttons").val() || "303030")).replace('##', '#'),
      'background': ('#' + ($(".domain_sbackground").val() || "fafafa")).replace('##', '#'),
      'script': $("#domain_scr").val(),
      'keywords': $("#domain_keywords").val(),
      'description': $("#domain_description").val()
    };
    _0x13aa85('cp', {
      'cmd': "domainsave",
      'data': _0x3a2af4
    });
  }
  function _0x76c5c5(_0x310847) {
    if ((_0x310847 || '') == '') {
      return _0x310847;
    }
    var _0x33f9fc = _0x310847.indexOf('://') != -0x1 ? _0x310847.split("://")[0x1] : _0x310847;
    _0x33f9fc = _0x33f9fc.split('/')[0x0].split('.');
    return _0x33f9fc.length < 0x2 || _0x33f9fc[_0x33f9fc.length - 0x1] == '' ? '' : _0x33f9fc[_0x33f9fc.length - 0x2] + '.' + _0x33f9fc[_0x33f9fc.length - 0x1];
  }
  function _0x27a654() {
    var _0x2b7f2f = {
      'name': $("#sett_name").val(),
      'title': $("#sett_title").val(),
      'bg': $("#cp .sbg").val(),
      'buttons': $(".sbuttons").val(),
      'background': $(".sbackground").val(),
      'wall_likes': parseInt($(".wall_likes").val()),
      'wall_minutes': parseInt($(".wall_minutes").val()),
      'msgst': parseInt($(".msgstt").val()),
      'pmlikes': parseInt($(".pmlikes").val()),
      'notlikes': parseInt($(".notlikes").val()),
      'fileslikes': parseInt($(".fileslikes").val()),
      'allowg': $(".allowg").is(":checked"),
      'allowreg': $(".allowreg").is(":checked"),
      'rc': $(".rc").is(":checked"),
      'bclikes': $("#bclikes").is(":checked"),
      'mlikes': $("#mlikes").is(":checked"),
      'bcreply': $("#bcreply").is(":checked"),
      'mreply': $("#mreply").is(":checked"),
      'script': $("#sett_scr").val(),
      'keywords': $("#sett_keywords").val(),
      'description': $("#sett_description").val(),
      'proflikes': parseInt($("#sett .proflikes").val()),
      'piclikes': parseInt($("#sett .piclikes").val()),
      'maxIP': $(".maxIP").val() || 0x2,
      'maxshrt': $(".maxshrt").val() || 0x1,
      'stay': Math.max(0x1, Math.min(0x258, $(".stay").val() || 0x1)),
      'callsLike': $(".callsLike").val() || 0x0,
      'calls': $("#calls").is(":checked")
    };
    _0x13aa85('cp', {
      'cmd': "sitesave",
      'data': _0x2b7f2f
    });
  }
  function _0xedbd67(_0x114919, _0x1057cd) {
    var _0x2984e9;
    _0x429dda("image/*", function (_0x4c4acd) {
      var _0x4de7a9 = $("<div class='mm msg ' style='width:200px;'><a class='fn '></a><button style='color:red;border:1px solid red;min-width:40px;' class=' cancl'>X</button></div>");
      _0x4de7a9.insertAfter($(_0x114919));
      $(_0x4de7a9).find(".cancl").click(function () {
        $(_0x4de7a9).remove();
        _0x2984e9.abort();
      });
      _0x2984e9 = _0x2280b7("upload?secid=u&a=x&fn=" + _0x4c4acd.name.split('.').pop(), _0x4c4acd, function (_0x383a6f) {
        _0x1057cd(_0x383a6f);
        $(_0x4de7a9).remove();
      }, function () {
        $(_0x4de7a9).remove();
      }, function (_0x1db3f4) {
        $(_0x4de7a9.find(".fn")).text('%' + parseInt(_0x1db3f4 * 0x64) + " | " + _0x4c4acd.name.split("\\").pop());
      });
    });
  }
  function _0x1c1a06(_0x249602) {
    _0x13aa85('cp', {
      'cmd': "addico",
      'pid': _0x249602,
      'tar': 'sico'
    });
  }
  function _0x272d63(_0x5ccb9a) {
    _0x13aa85('cp', {
      'cmd': "delico",
      'pid': $(_0x5ccb9a).attr("pid")
    });
  }
  function _0x43ef9c() {
    $(".p-emo").append($(".p-emo div").remove().sort(function (_0x5d4099, _0x4f21b3) {
      return parseInt($(_0x5d4099).find("input").val()) > parseInt($(_0x4f21b3).find("input").val()) ? 0x1 : -0x1;
    }).each(function (_0x1d885e, _0xe2e9b3) {
      _0xe2e9b3 = $(_0xe2e9b3).find("input");
      _0xe2e9b3.attr("onchange", '');
      _0xe2e9b3.val(_0x1d885e + 0x1);
      _0xe2e9b3.attr("onchange", "emo_order();");
    }));
  }
  function _0x5a83db(_0x4bf537) {
    var _0x439b3b = _0x4bf537.toLocaleString("en-us").split(',');
    switch (_0x439b3b.length) {
      case 0x1:
      case 0x2:
        return _0x4bf537.toLocaleString();
      case 0x3:
        return _0x439b3b[0x0] + '.' + _0x439b3b[0x1][0x0] + 'M';
      case 0x4:
        return _0x439b3b[0x0] + '.' + _0x439b3b[0x1][0x0] + 'B';
    }
    return "999.9B";
  }
  function _0x1eb299(_0x18fb13) {
    if (_0x51f8c1 == null) {
      var _0x155380 = window.open("cp?cp=" + myid);
      setTimeout(function () {
        _0x155380.postMessage(['ev', {
          'data': " $(\"a[href='#fps']\").click();\n            $('#fps input').val('" + _0x18fb13 + "').trigger('change');"
        }]);
      }, 0x64);
      return;
    }
    _0x5d1dc8();
    $("a[href='#fps']").click();
    $("#fps input").val(_0x18fb13).trigger("change");
  }
  function _0x21c9a3(_0x5b6992, _0x203162) {
    _0x8d88fa(_0x5b6992, "الزخرفه,الوصف,الدوله,اللون,لون الخلفيه,تسجيل دخول,تسجيل خروج,الصوره,حذف الصوره,الغرفه,----,حذف".split(','), function (_0x465582) {
      switch (_0x465582) {
        case "الغرفه":
          _0x8d88fa(_0x5b6992, _0x12093e.filter(function (_0x5a6cbc) {
            return _0x5a6cbc["delete"] != true && _0x5a6cbc.needpass == false;
          }).map(function (_0x1ee230) {
            return _0x1ee230.topic;
          }), function (_0x5a06b7) {
            var _0x5dc2e0 = _0x12093e.filter(function (_0x1141d9) {
              return _0x1141d9.topic == _0x5a06b7;
            });
            if (_0x5dc2e0.length) {
              $(_0x5b6992).parent().parent().find("td:eq(5)").text(_0x5dc2e0[0x0].topic);
              _0x13aa85('cp', {
                'cmd': "bot",
                'id': _0x203162,
                'or': _0x5dc2e0[0x0].id
              });
            }
          });
          break;
        case "اللون":
          var _0x1a2cd8 = $(cldiv);
          var _0x563be7 = _0x5b6992;
          _0x1a2cd8.find('div').off().click(function () {
            var _0x2c7b38 = $(_0x5b6992).parent().parent().find("td:eq(2)")[0x0];
            $(_0x2c7b38).css("color", this.style.color || '');
            $(_0x2c7b38).css("color", $(this).attr('v')).attr('v', $(this).attr('v'));
            _0x13aa85('cp', {
              'cmd': "bot",
              'id': _0x203162,
              'ucol': $(this).attr('v')
            });
          });
          _0x4a935e(_0x563be7, _0x1a2cd8);
          break;
        case "لون الخلفيه":
          var _0x1a2cd8 = $(cldiv);
          var _0x563be7 = _0x5b6992;
          _0x1a2cd8.find('div').off().click(function () {
            var _0x5acd30 = $(_0x5b6992).parent().parent().find("td:eq(2)")[0x0];
            $(_0x5acd30).css("background-color", this.style["background-color"] || '');
            $(_0x5acd30).css("background-color", $(this).attr('v')).attr('v', $(this).attr('v'));
            _0x13aa85('cp', {
              'cmd': "bot",
              'id': _0x203162,
              'bg': $(this).attr('v')
            });
          });
          _0x4a935e(_0x563be7, _0x1a2cd8);
          break;
        case "الزخرفه":
          var _0xfed107 = prompt("الزخرفه الجديده");
          if (typeof _0xfed107 == "string" && _0xfed107.length > 0x1) {
            _0x13aa85('cp', {
              'cmd': 'bot',
              'id': _0x203162,
              'topic': _0xfed107
            });
            $(_0x5b6992).parent().parent().find("td:eq(2)").text(_0xfed107);
          }
          break;
        case "الوصف":
          var _0xfed107 = prompt("الوصف");
          if (typeof _0xfed107 == "string" && _0xfed107.length > 0x1) {
            _0x13aa85('cp', {
              'cmd': 'bot',
              'id': _0x203162,
              'msg': _0xfed107
            });
            $(_0x5b6992).parent().parent().find("td:eq(3)").text(_0xfed107);
          }
          break;
        case "تسجيل دخول":
          _0x13aa85('cp', {
            'cmd': 'bot',
            'id': _0x203162,
            'online': true
          });
          $(_0x5b6992).parent().parent().find("td:eq(0)").text("متصل");
          break;
        case "تسجيل خروج":
          _0x13aa85('cp', {
            'cmd': "bot",
            'id': _0x203162,
            'online': false
          });
          $(_0x5b6992).parent().parent().find("td:eq(0)").text('');
          break;
        case "الدوله":
          var _0xfed107 = prompt("اكتب اسم الدوله من حرفين SA US IQ KW");
          if (typeof _0xfed107 == "string" && _0xfed107.length == 0x2 && uf[_0xfed107.toLowerCase()] != null) {
            _0x13aa85('cp', {
              'cmd': "bot",
              'id': _0x203162,
              'co': _0xfed107.toUpperCase()
            });
            $(_0x5b6992).parent().parent().find("td:eq(1)").text(_0xfed107.toUpperCase());
          }
          break;
        case "حذف الصوره":
          _0x13aa85('cp', {
            'cmd': "bot",
            'id': _0x203162,
            'pic': "pic.png"
          });
          $(_0x5b6992).parent().find('img').attr("src", "pic.png");
          break;
        case "الصوره":
          _0x262be9(null, function (_0x2af0a7) {
            _0x13aa85('cp', {
              'cmd': "bot",
              'id': _0x203162,
              'pic': _0x2af0a7
            });
            $(_0x5b6992).parent().find('img').attr("src", _0x2af0a7);
          });
          break;
        case "حذف":
          _0x13aa85('cp', {
            'cmd': 'bot',
            'id': _0x203162,
            'del': true
          });
          $(_0x5b6992).remove();
          break;
      }
    });
  }
  function _0x2b5898(_0x2179bf, _0x2a7140, _0x2eb422) {
    _0x8d88fa(_0x2179bf, "بحث,بحث عميق 1,بحث عميق 2,بحث عميق 3,بحث عميق 4,حظر,حظر عميق 1,حظر عميق 2,حظر عميق 3,حظر عميق 4,سماح".split(','), function (_0x29d16b) {
      switch (_0x29d16b) {
        case "بحث":
          $((_0x2eb422 == true ? "#logins" : "#fps") + " input").val(_0x2a7140).trigger("change");
          break;
        case "بحث عميق 1":
          $((_0x2eb422 == true ? "#logins" : "#fps") + " input").val('*=' + _0x2a7140).trigger("change");
          break;
        case "بحث عميق 2":
          $((_0x2eb422 == true ? "#logins" : "#fps") + " input").val("**=" + _0x2a7140).trigger("change");
          break;
        case "بحث عميق 3":
          $((_0x2eb422 == true ? "#logins" : "#fps") + " input").val("***=" + _0x2a7140).trigger("change");
          break;
        case "بحث عميق 4":
          $((_0x2eb422 == true ? "#logins" : "#fps") + " input").val("****=" + _0x2a7140).trigger("change");
          break;
        case "حظر":
          _0x13aa85('cp', {
            'cmd': 'ban',
            'type': _0x2a7140
          });
          break;
        case "حظر عميق 1":
          _0x13aa85('cp', {
            'cmd': 'ban',
            'type': '*=' + _0x2a7140
          });
          break;
        case "حظر عميق 2":
          _0x13aa85('cp', {
            'cmd': "ban",
            'type': "**=" + _0x2a7140
          });
          break;
        case "حظر عميق 3":
          _0x13aa85('cp', {
            'cmd': "ban",
            'type': '***=' + _0x2a7140
          });
          break;
        case "حظر عميق 4":
          _0x13aa85('cp', {
            'cmd': "ban",
            'type': "****=" + _0x2a7140
          });
          break;
        case "سماح":
          _0x13aa85('cp', {
            'cmd': "aban",
            'type': _0x2a7140
          });
          break;
      }
    });
  }
  function _0x1bfab9(_0x100283, _0x53e713) {
    _0x8d88fa(_0x100283, "الايكات,كلمه المرور,الصلاحيه,-----,حذف العضويه".split(','), function (_0x3a27c1) {
      switch (_0x3a27c1) {
        case "الايكات":
          var _0x13a557 = parseInt(prompt("اكتب الايكات الجديدة"));
          if (_0x13a557 != null && !isNaN(_0x13a557)) {
            _0x13aa85('cp', {
              'cmd': "likes",
              'id': _0x53e713,
              'likes': _0x13a557
            });
          }
          break;
        case "كلمه المرور":
          var _0x13a557 = prompt("كلمه المرور الجديدة");
          if (_0x13a557 != null && _0x13a557 != '') {
            _0x13aa85('cp', {
              'cmd': "pwd",
              'id': _0x53e713,
              'pwd': _0x13a557
            });
          }
          break;
        case "الصلاحيه":
          var _0x1e8881 = [];
          _0x1e8881.push("البحث");
          _0x1e8881.push("سحب الصلاحيه");
          var _0x486f6e = {};
          for (var _0x378777 = 0x0; _0x378777 < _0x5a3802.length; _0x378777++) {
            _0x486f6e['[' + _0x5a3802[_0x378777].rank.toString().padStart(0x4, '0') + "] " + _0x5a3802[_0x378777].name] = _0x5a3802[_0x378777].name;
            _0x1e8881.push('[' + _0x5a3802[_0x378777].rank.toString().padStart(0x4, '0') + "] " + _0x5a3802[_0x378777].name);
          }
          _0x1e8881.sort(function (_0xc62976, _0x2eeba6) {
            return _0x2eeba6.localeCompare(_0xc62976);
          });
          _0x8d88fa(_0x100283, _0x1e8881, function (_0x1d39b9) {
            if (_0x1d39b9 == "سحب الصلاحيه") {
              _0x13aa85('cp', {
                'cmd': "setpower",
                'id': _0x53e713,
                'days': 0x0,
                'power': ''
              });
            } else {
              if (_0x1d39b9 == "البحث") {
                var _0x56a282 = prompt("البحث في الصلاحيات.\n اكتب اسم الصلاحيه", '');
                if (_0x56a282 != null) {
                  _0x1e8881 = [];
                  _0x486f6e = {};
                  for (var _0x3b8ce9 = 0x0; _0x3b8ce9 < _0x5a3802.length; _0x3b8ce9++) {
                    var _0x3567e7 = _0x5a3802[_0x3b8ce9];
                    if (_0x3567e7.name.indexOf(_0x56a282) != -0x1 || _0x3567e7.rank == _0x56a282) {
                      _0x486f6e['[' + _0x5a3802[_0x3b8ce9].rank.toString().padStart(0x4, '0') + "] " + _0x5a3802[_0x3b8ce9].name] = _0x5a3802[_0x3b8ce9].name;
                      _0x1e8881.push('[' + _0x5a3802[_0x3b8ce9].rank.toString().padStart(0x4, '0') + "] " + _0x5a3802[_0x3b8ce9].name);
                    }
                  }
                  _0x1e8881.sort(function (_0x39d410, _0x28a556) {
                    return _0x28a556.localeCompare(_0x39d410);
                  });
                  _0x8d88fa(_0x100283, _0x1e8881, function (_0x2bbb12) {
                    var _0x2761c1 = parseInt(prompt("مده الإشتراك؟ 0 = دائم", '0') || '0');
                    _0x13aa85('cp', {
                      'cmd': "setpower",
                      'id': _0x53e713,
                      'days': _0x2761c1,
                      'power': _0x486f6e[_0x2bbb12]
                    });
                  });
                }
              } else {
                var _0x56a282 = parseInt(prompt("مده الإشتراك؟ 0 = دائم", '0') || '0');
                _0x13aa85('cp', {
                  'cmd': "setpower",
                  'id': _0x53e713,
                  'days': _0x56a282,
                  'power': _0x486f6e[_0x1d39b9]
                });
              }
            }
          });
          break;
        case "حذف العضويه":
          _0x13aa85('cp', {
            'cmd': 'delu',
            'id': _0x53e713
          });
          $(_0x100283).remove();
          break;
      }
    });
  }
})();
