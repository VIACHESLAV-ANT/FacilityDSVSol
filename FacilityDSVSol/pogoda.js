!function(r, n) {
    const o = {
        scrollWidgetOff: 150,
        deviceWidth: parseInt(r.innerWidth || n.body.clientWidth, 10)
    }
      , a = {
        pl: 0.1578,
        wrl: 1268.4,
        limit: 999999999,
        prefix: "+ ",
        prefixEnd: "> ",
        dateDis: new Date(2030,1,1,0,0,0)
    }
      , t = r.sessionStorage;
    let l = {}
      , i = 0
      , d = {
        pl: !1,
        wrl: !1
    }
      , s = {
        pl: 0,
        wrl: 0
    };
    const c = {
        addEvent: function(e, t, n) {
            for (var o = 0; o < t.length; o++)
                if ("on" + t[o]in r)
                    return void (e.addEventListener ? e.addEventListener(t[o], n, !1) : e.attachEvent && e.attachEvent("on" + t[o], n))
        },
        getScreenWidth: function() {
            return parseInt(r.innerWidth || n.body.clientWidth, 10)
        },
        isDesktop: function(e) {
            return e ? 1199 <= e : 1199 <= o.deviceWidth
        },
        isMouseInContainer: function(e, t) {
            t = t.getBoundingClientRect();
            return e.clientX >= t.left && e.clientX <= t.right && e.clientY >= t.top && e.clientY <= t.bottom
        }
    };
    function e(e) {
        return parseFloat(e, 2)
    }
    function u(e) {
        let t = 9999 < e ? 0 : 2;
        return e = e.toFixed(t),
        (e = new String(e).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")).replace(".", ",")
    }
    function p() {
        f(),
        l.range.poland.textContent = a.prefixEnd + 1,
        l.range.poland.unit.textContent = "mld ton",
        d.pl = !0
    }
    function g() {
        f(),
        l.range.world.textContent = a.prefixEnd + 1,
        l.range.world.unit.textContent = "mld ton",
        d.wrl = !0
    }
    function y(e, t) {
        return 9999 < e ? Math.round(e + t) : e + t
    }
    function f() {
        c.isDesktop(!1) && (l.range.gap.style.marginLeft = "20px",
        l.range.gap.style.paddingRight = "10px")
    }
    function w() {
        var e;
        d.wrl || ((e = s.wrl) > a.limit || (s.wrl = y(e, a.wrl),
        s.wrl >= a.limit) ? g() : (e = a.prefix + u(s.wrl),
        l.range.world.textContent = e),
        (e = s.pl) >= a.limit || (s.pl = y(e, a.pl),
        s.pl >= a.limit) ? p() : (e = a.prefix + u(s.pl),
        l.range.poland.textContent = e))
    }
    function h() {
        var e = new Date
          , t = a.dateDis.getFullYear() - (e.getFullYear() + 1)
          , n = (o = e.getMonth() + 1,
        n = e.getFullYear(),
        new Date(n,o,0).getDate() - e.getDate())
          , o = 12 - (e.getMonth() + 1)
          , r = 24 - (e.getHours() + 1)
          , i = 60 - (e.getMinutes() + 1)
          , e = 60 - (e.getSeconds() + 1);
        l.date.years.textContent = t,
        l.date.months.textContent = o,
        l.date.days.textContent = n,
        l.date.hours.textContent = r,
        l.date.minutes.textContent = i,
        l.date.seconds.textContent = e
    }
    function m() {
        w(),
        h()
    }
    null != (b = t.getItem("pollution-emission")) && ((b = JSON.parse(b)) && b.pl && (b.pl = e(b.pl),
    0 < b.pl ? s.pl = b.pl : s.pl = 0),
    b) && b.wrl && (b.wrl = e(b.wrl),
    0 < b.wrl ? s.wrl = b.wrl : s.wrl = 0),
    l.root = n.querySelector(".widgets-pollution");
    var b = l.root.querySelector(".pollution-range-title-text")
      , v = b.getAttribute("data-range-label");
    b.textContent = v,
    l.description = {},
    l.description.body = l.root.querySelector(".pollution-description"),
    l.description.open = l.root.querySelector(".pollution-description-open"),
    l.range = {},
    l.range.body = l.root.querySelector(".pollution-range"),
    l.range.poland = l.range.body.querySelector(".range-poland"),
    l.range.poland.unit = l.range.body.querySelector(".poland .pollution-range-unit"),
    l.range.world = l.range.body.querySelector(".range-world"),
    l.range.world.unit = l.range.body.querySelector(".world .pollution-range-unit"),
    l.range.gap = l.range.body.querySelector(".pollution-range-item.poland"),
    w(),
    l.date = {},
    l.date.body = l.root.querySelector(".pollution-date"),
    l.date.years = l.date.body.querySelector(".date-years"),
    l.date.months = l.date.body.querySelector(".date-months"),
    l.date.days = l.date.body.querySelector(".date-days"),
    l.date.hours = l.date.body.querySelector(".date-hours"),
    l.date.minutes = l.date.body.querySelector(".date-minutes"),
    l.date.seconds = l.date.body.querySelector(".date-seconds"),
    l.changeView = l.root.querySelector(".pollution-change-view"),
    r.setInterval(m, 1e3),
    c.addEvent(r, ["beforeunload"], function(e) {
        r.setTimeout(function() {
            t.setItem("pollution-emission", JSON.stringify(s))
        }, 1)
    }, !0),
    c.addEvent(n.body, ["click", "touchstart"], function(e) {
        var t = e.target.classList;
        if (t.contains("pollution-description-open") && c.isMouseInContainer(e, l.description.open))
            e.stopPropagation(),
            r.setTimeout(function() {
                l.description.body.classList.contains("show") ? l.description.body.classList.remove("show") : l.description.body.classList.add("show")
            }, 1);
        else if (t.contains("pollution-change-view") && c.isMouseInContainer(e, l.changeView))
            e.stopPropagation(),
            r.setTimeout(function() {
                l.changeView.classList.contains("left") ? (l.changeView.classList.remove("left"),
                l.date.body.classList.remove("show"),
                l.range.body.classList.remove("hide")) : (l.changeView.classList.add("left"),
                l.date.body.classList.add("show"),
                l.range.body.classList.add("hide"))
            }, 1);
        else {
            if (!t.contains("pollution-description-text") || !c.isMouseInContainer(e, l.description.body))
                return r.setTimeout(function() {
                    l.description.body.classList.remove("show")
                }, 1),
                !0;
            e.stopPropagation()
        }
    }, !1),
    r.addEventListener("scroll", function(e) {
        var t = r.pageYOffset || n.documentElement.scrollTop;
        i = (!(t < i) && t > o.scrollWidgetOff ? l.root.classList.add("hide") : l.root.classList.remove("hide"),
        t)
    }, !0),
    r.addEventListener("resize", function(e) {
        c.isDesktop(c.getScreenWidth()) && (l.range.body.classList.remove("hide"),
        l.date.body.classList.remove("show"),
        l.changeView.classList.remove("left"))
    }, !0)
}(window, document);
