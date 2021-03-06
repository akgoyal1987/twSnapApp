var exports = exports || this;
exports.OAuth = function(e) {
    function t(e) {
        var t = arguments,
            n = t.callee,
            r = t.length,
            i,
            s = this;
        if (this instanceof n) {
            for (i in e)e.hasOwnProperty(i) && (s[i] = e[i]);
            return s
        }
        return new n(e)
    }

    function n() {
    }

    function r(e) {
        var t = arguments,
            n = t.callee,
            r,
            s,
            o,
            u,
            a,
            f,
            l,
            c = /^([^:\/?#]+?:\/\/)*([^\/:?#]*)?(:[^\/?#]*)*([^?#]*)(\?[^#]*)?(#(.*))*/,
            h = this;
        if (!(this instanceof n))
            return new n(e);
        h.scheme = "", h.host = "", h.port = "", h.path = "", h.query = new i, h.anchor = "";
        if (e !== null) {
            r = e.match(c),
            s = r[1],
            o = r[2],
            u = r[3],
            a = r[4],
            f = r[5],
            l = r[6],
            s = s !== undefined ? s.replace("://", "").toLowerCase() : "http",
            u = u ? u.replace(":", "") : s === "https" ? "443" : "80",
            s = s == "http" && u === "443" ? "https" : s,
            f = f ? f.replace("?", "") : "",
            l = l ? l.replace("#", "") : "";
            if (s === "https" && u !== "443" || s === "http" && u !== "80")
                o = o + ":" + u;
            h.scheme = s, 
            h.host = o, 
            h.port = u, 
            h.path = a || "/", h.query.setQueryParams(f), h.anchor = l || ""
        }
    }

    function i(e) {
        var t = arguments,
            n = t.callee,
            r = t.length,
            i,
            s = this,
            u = o.urlDecode;
        if (this instanceof n) {
            if (e != undefined)
                for (i in e)e.hasOwnProperty(i) && (s[i] = e[i]);
            return s
        }
        return new n(e)
    }

    function o(e) {
        return this instanceof o ? this.init(e) : new o(e)
    }

    function u(e) {
        var t = [],
            n,
            r;
        for (n in e)e[n] && e[n] !== undefined && e[n] !== "" && (n === "realm" ? r = n + '="' + e[n] + '"' : t.push(n + '="' + o.urlEncode(e[n] + "") + '"'));
        return t.sort(), r && t.unshift(r), t.join(", ")
    }

    function a(e, t, n, r) {
        var i = [],
            s,
            u = o.urlEncode;
        for (s in n)n[s] !== undefined && n[s] !== "" && i.push([o.urlEncode(s), o.urlEncode(n[s] + "")]);
        for (s in r)r[s] !== undefined && r[s] !== "" && (n[s] || i.push([u(s), u(r[s] + "")]));
        return i = i.sort(function(e, t) {
            return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : e[1] < t[1] ? -1 : e[1] > t[1] ? 1 : 0
        }).map(function(e) {
            return e.join("=")
        }), [e, u(t), u(i.join("&"))].join("&")
    }

    function f() {
        return parseInt(+(new Date) / 1e3, 10)
    }

    function l(e) {
        function t() {
            return Math.floor(Math.random() * u.length)
        }

        e = e || 64;
        var n = e / 8,
            r = "",
            i = n / 4,
            s = n % 4,
            o,
            u = ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D", "2E", "2F", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D", "3E", "3F", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4A", "4B", "4C", "4D", "4E", "4F", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5A", "5B", "5C", "5D", "5E", "5F", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6A", "6B", "6C", "6D", "6E", "6F", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7D", "7E"];
        for ( o = 0; o < i; o++)
            r += u[t()] + u[t()] + u[t()] + u[t()];
        for ( o = 0; o < s; o++)
            r += u[t()];
        return r
    }

    function c() {
        var t;
        if ( typeof e.Titanium != "undefined" && typeof e.Titanium.Network.createHTTPClient != "undefined")
            t = e.Titanium.Network.createHTTPClient();
        else if ( typeof require != "undefined")
            try {
                t = (new require("xhr")).XMLHttpRequest()
            } catch(n) {
                if ( typeof e.XMLHttpRequest == "undefined")
                    throw "No valid request transport found.";
                t = new e.XMLHttpRequest
            }
        else {
            if ( typeof e.XMLHttpRequest == "undefined")
                throw "No valid request transport found.";
            t = new e.XMLHttpRequest
        }
        return t
    }

    function h(e) {
        var t = new Array(++e);
        return t.join(0).split("")
    }

    function p(e) {
        var t = [],
            n,
            r;
        for ( r = 0; r < e.length; r++)
            n = e.charCodeAt(r), n < 128 ? t.push(n) : n < 2048 ? t.push(192 + (n >> 6), 128 + (n & 63)) : n < 65536 ? t.push(224 + (n >> 12), 128 + (n >> 6 & 63), 128 + (n & 63)) : n < 2097152 && t.push(240 + (n >> 18), 128 + (n >> 12 & 63), 128 + (n >> 6 & 63), 128 + (n & 63));
        return t
    }

    function d(e) {
        var t = [],
            n;
        for ( n = 0; n < e.length * 32; n += 8)
            t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
        return t
    }

    function v(e) {
        var t = [],
            n = e.length,
            r;
        for ( r = 0; r < n; r++)
            t.push((e[r] >>> 4).toString(16)), t.push((e[r] & 15).toString(16));
        return t.join("")
    }

    function m(e) {
        var t = "",
            n = e.length,
            r;
        for ( r = 0; r < n; r++)
            t += String.fromCharCode(e[r]);
        return t
    }

    function g(e, t) {
        return e << t | e >>> 32 - t
    }

    function y(e) {
        if (e !== undefined) {
            var t = e,
                n,
                r;
            return t.constructor === String && ( t = p(t)), this instanceof y ? n = this : n = new y(e),
            r = n.hash(t), v(r)
        }
        return this instanceof y ? this : new y
    }

    function b(e, t, n, r) {
        var i = p(t),
            s = p(n),
            o = i.length,
            u,
            a,
            f,
            l;
        o > e.blocksize && ( i = e.hash(i),
        o = i.length),
        i = i.concat(h(e.blocksize - o)),
        a = i.slice(0),
        f = i.slice(0);
        for ( l = 0; l < e.blocksize; l++)
            a[l] ^=92, f[l] ^=54;
        return u = e.hash(a.concat(e.hash(f.concat(s)))), r ? v(u) : m(u)
    }
    n.prototype = {
        join : function(e) {
            return e = e || "", this.values().join(e)
        },
        keys : function() {
            var e,
                t = [],
                n = this;
            for (e in n)n.hasOwnProperty(e) && t.push(e);
            return t
        },
        values : function() {
            var e,
                t = [],
                n = this;
            for (e in n)n.hasOwnProperty(e) && t.push(n[e]);
            return t
        },
        shift : function() {
            throw "not implimented"
        },
        unshift : function() {
            throw "not implimented"
        },
        push : function() {
            throw "not implimented"
        },
        pop : function() {
            throw "not implimented"
        },
        sort : function() {
            throw "not implimented"
        },
        ksort : function(e) {
            var t = this,
                n = t.keys(),
                r,
                i,
                s;
            e == undefined ? n.sort() : n.sort(e);
            for ( r = 0; r < n.length; r++)
                s = n[r],
                i = t[s],
                delete t[s], t[s] =
                i;
            return t
        },
        toObject : function() {
            var e = {},
                t,
                n = this;
            for (t in n)n.hasOwnProperty(t) && (e[t] = n[t]);
            return e
        }
    }, t.prototype = new n, r.prototype = {
        scheme : "",
        host : "",
        port : "",
        path : "",
        query : "",
        anchor : "",
        toString : function() {
            var e = this,
                t = e.query + "";
            return e.scheme + "://" + e.host + e.path + (t != "" ? "?" + t : "") + (e.anchor !== "" ? "#" + e.anchor : "")
        }
    }, i.prototype = new t, i.prototype.toString = function() {
        var e,
            t = this,
            n = [],
            r = "",
            i = "",
            s = o.urlEncode;
        t.ksort();
        for (e in t)t.hasOwnProperty(e) && e != undefined && t[e] != undefined && ( i = s(e) + "=" + s(t[e]), n.push(i));
        return n.length > 0 && ( r = n.join("&")), r
    }, i.prototype.setQueryParams = function(e) {
        var t = arguments,
            n = t.length,
            r,
            i,
            s,
            u = this,
            a,
            f = o.urlDecode;
        if (n == 1) {
            if ( typeof e == "object")
                for (r in e)e.hasOwnProperty(r) && (u[r] = f(e[r]));
            else if ( typeof e == "string") {
                i = e.split("&");
                for ( r = 0,
                s = i.length; r < s; r++)
                    a = i[r].split("="), a[0] != "" && (u[a[0]] = f(a[1]))
            }
        } else
            for ( r = 0; r < n; r += 2)
                u[t[r]] = f(t[r + 1])
    };
    var s = "1.0";
    return o.prototype = {
        realm : "",
        requestTokenUrl : "",
        authorizationUrl : "",
        accessTokenUrl : "",
        init : function(e) {
            var t = "",
                n = {
                enablePrivilege : e.enablePrivilege || !1,
                proxyUrl : e.proxyUrl,
                callbackUrl : e.callbackUrl || "oob",
                consumerKey : e.consumerKey,
                consumerSecret : e.consumerSecret,
                accessTokenKey : e.accessTokenKey || t,
                accessTokenSecret : e.accessTokenSecret || t,
                verifier : t,
                signatureMethod : e.signatureMethod || "HMAC-SHA1"
            };
            return this.realm = e.realm || t, this.requestTokenUrl = e.requestTokenUrl || t, this.authorizationUrl = e.authorizationUrl || t, this.accessTokenUrl = e.accessTokenUrl || t, this.getAccessToken = function() {
                return [n.accessTokenKey, n.accessTokenSecret]
            }, this.getAccessTokenKey = function() {
                return n.accessTokenKey
            }, this.getAccessTokenSecret = function() {
                return n.accessTokenSecret
            }, this.setAccessToken = function(e, t) {
                t && ( e = [e, t]), n.accessTokenKey = e[0], n.accessTokenSecret = e[1]
            }, this.getVerifier = function() {
                return n.verifier
            }, this.setVerifier = function(e) {
                n.verifier = e
            }, this.setCallbackUrl = function(e) {
                n.callbackUrl = e
            }, this.request = function(e) {
                var t,
                    i,
                    h,
                    p,
                    d,
                    v,
                    m,
                    g,
                    y,
                    b,
                    w,
                    E,
                    S = [],
                    x,
                    T = {},
                    N,
                    C,
                    k;
                t = e.method || "GET",
                i = r(e.url),
                h = e.data || {},
                p = e.headers || {},
                d = e.success ||
                function() {
                },
                v = e.failure ||
                function() {
                },
                C = function() {
                    var e = !1;
                    for (var t in h)
                    if (h[t] instanceof File || typeof h[t].fileName != "undefined")
                        e = !0;
                    return e
                }(),
                x = e.appendQueryString ? e.appendQueryString : !1, n.enablePrivilege && netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead UniversalBrowserWrite"),
                m = c(), m.onreadystatechange = function() {
                    if (m.readyState === 4) {
                        var e = /^(.*?):\s*(.*?)\r?$/mg,
                            t =
                            p,
                            n = {},
                            r = "",
                            i;
                        if (!m.getAllResponseHeaders) {
                            if (!!m.getResponseHeaders) {
                                r = m.getResponseHeaders();
                                for (var s = 0,
                                    o = r.length; s < o; ++s)
                                    n[r[s][0]] = r[s][1]
                            }
                        } else {
                            r = m.getAllResponseHeaders();
                            while ( i = e.exec(r))
                            n[i[1]] = i[2]
                        }
                        var u = !1;
                        "Content-Type" in n && n["Content-Type"] == "text/xml" && ( u = !0);
                        var a = {
                            text : m.responseText,
                            xml : u ? m.responseXML : "",
                            requestHeaders : t,
                            responseHeaders : n
                        };
                        m.status >= 200 && m.status <= 226 || m.status == 304 || m.status === 0 ? d(a) : m.status >= 400 && m.status !== 0 && v(a)
                    }
                },
                y = {
                    oauth_callback : n.callbackUrl,
                    oauth_consumer_key : n.consumerKey,
                    oauth_token : n.accessTokenKey,
                    oauth_signature_method : n.signatureMethod,
                    oauth_timestamp : f(),
                    oauth_nonce : l(),
                    oauth_verifier : n.verifier,
                    oauth_version : s
                },
                b = n.signatureMethod,
                N = i.query.toObject();
                for (g in N)
                T[g] = N[g];
                if ((!("Content-Type" in p) || p["Content-Type"] == "application/x-www-form-urlencoded") && !C)
                    for (g in h)
                    T[g] = h[g];
                k = i.scheme + "://" + i.host + i.path,
                w = a(t, k, y, T),
                E = o.signatureMethod[b](n.consumerSecret, n.accessTokenSecret, w), y.oauth_signature =
                E, this.realm && (y.realm = this.realm), n.proxyUrl && ( i = r(n.proxyUrl + i.path));
                if (x || t == "GET")
                    i.query.setQueryParams(h),
                    S = null;
                else if (!C)
                    if ( typeof h == "string")
                        S = h, "Content-Type" in p || (p["Content-Type"] = "text/plain");
                    else {
                        for (g in h)
                        S.push(o.urlEncode(g) + "=" + o.urlEncode(h[g] + ""));
                        S = S.sort().join("&"), "Content-Type" in p || (p["Content-Type"] = "application/x-www-form-urlencoded")
                    }
                else if (C) {
                    S = new FormData;
                    for (g in h)
                    S.append(g, h[g])
                }
                m.open(t, i + "", !0), m.setRequestHeader("Authorization", "OAuth " + u(y)), m.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                for (g in p)
                m.setRequestHeader(g, p[g]);
                m.send(S)
            }, this
        },
        get : function(e, t, n) {
            this.request({
                url : e,
                success : t,
                failure : n
            })
        },
        post : function(e, t, n, r) {
            this.request({
                method : "POST",
                url : e,
                data : t,
                success : n,
                failure : r
            })
        },
        getJSON : function(e, t, n) {
            this.get(e, function(e) {
                t(JSON.parse(e.text))
            }, n)
        },
        postJSON : function(e, t, n, r) {
            this.request({
                method : "POST",
                url : e,
                data : JSON.stringify(t),
                success : function(e) {
                    n(JSON.parse(e.text))
                },
                failure : r,
                headers : {
                    "Content-Type" : "application/json"
                }
            })
        },
        parseTokenRequest : function(e, t) {
            switch(t) {
            case"text/xml":
                var n = e.xml.getElementsByTagName("token"),
                    r = e.xml.getElementsByTagName("secret");
                a[o.urlDecode(n[0])] = o.urlDecode(r[0]);
                break;
            default:
                var i = 0,
                    s = e.text.split("&"),
                    u = s.length,
                    a = {};
                for (; i < u; ++i) {
                    var f = s[i].split("=");
                    a[o.urlDecode(f[0])] = o.urlDecode(f[1])
                }
            }
            return a
        },
        fetchRequestToken : function(e, t) {
            var n = this;
            n.setAccessToken("", "");
            var r = n.authorizationUrl;
            this.get(this.requestTokenUrl, function(t) {
                var i = n.parseTokenRequest(t, t.responseHeaders["Content-Type"] || undefined);
                n.setAccessToken([i.oauth_token, i.oauth_token_secret]), e(r + "?" + t.text)
            }, t)
        },
        fetchAccessToken : function(e, t) {
            var n = this;
            this.get(this.accessTokenUrl, function(t) {
                var r = n.parseTokenRequest(t, t.responseHeaders["Content-Type"] || undefined);
                n.setAccessToken([r.oauth_token, r.oauth_token_secret]), n.setVerifier(""), e(t)
            }, t)
        }
    }, o.signatureMethod = {
        "HMAC-SHA1" : function(t, n, r) {
            var i,
                s,
                u = o.urlEncode;
            return t = u(t),
            n = u(n || ""),
            i = t + "&" + n,
            s = b(y.prototype, i, r), e.btoa(s)
        }
    }, o.urlEncode = function(e) {
        function t(e) {
            var t = e.toString(16).toUpperCase();
            return t.length < 2 && ( t = 0 + t), "%" + t
        }

        if (!e)
            return "";
        e += "";
        var n = /[ \r\n!*"'();:@&=+$,\/?%#\[\]<>{}|`^\\\u0080-\uffff]/,
            r = e.length,
            i,
            s = e.split(""),
            o;
        for ( i = 0; i < r; i++)
            if ( o = s[i].match(n))
                o = o[0].charCodeAt(0), o < 128 ? s[i] = t(o) : o < 2048 ? s[i] = t(192 + (o >> 6)) + t(128 + (o & 63)) : o < 65536 ? s[i] = t(224 + (o >> 12)) + t(128 + (o >> 6 & 63)) + t(128 + (o & 63)) : o < 2097152 && (s[i] = t(240 + (o >> 18)) + t(128 + (o >> 12 & 63)) + t(128 + (o >> 6 & 63)) + t(128 + (o & 63)));
        return s.join("")
    }, o.urlDecode = function(e) {
        return e ? e.replace(/%[a-fA-F0-9]{2}/ig, function(e) {
            return String.fromCharCode(parseInt(e.replace("%", ""), 16))
        }) : ""
    }, y.prototype = new y, y.prototype.blocksize = 64, y.prototype.hash = function(e) {
        function C(e, t, n, r) {
            switch(e) {
            case 0:
                return t & n | ~t & r;
            case 1:
            case 3:
                return t ^ n ^ r;
            case 2:
                return t & n | t & r | n & r
            }
            return -1
        }

        var t = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            n = [1518500249, 1859775393, 2400959708, 3395469782],
            r,
            i,
            s,
            o,
            u,
            a,
            f,
            l,
            c,
            v,
            m,
            y,
            b,
            w,
            E,
            S,
            x,
            T,
            N;
        e.constructor === String && ( e = p(e.encodeUTF8())),
        s = e.length,
        o = Math.ceil((s + 9) / this.blocksize) * this.blocksize - (s + 9),
        i = Math.floor(s / 4294967296),
        r = Math.floor(s % 4294967296),
        u = [i * 8 >> 24 & 255, i * 8 >> 16 & 255, i * 8 >> 8 & 255, i * 8 & 255, r * 8 >> 24 & 255, r * 8 >> 16 & 255, r * 8 >> 8 & 255, r * 8 & 255],
        e = e.concat([128], h(o), u),
        a = Math.ceil(e.length / this.blocksize);
        for ( f = 0; f < a; f++) {
            l = e.slice(f * this.blocksize, (f + 1) * this.blocksize),
            c = l.length,
            v = [];
            for ( m = 0; m < c; m++)
                v[m >>> 2] |= l[m] << 24 - (m - (m >> 2) * 4) * 8;
            y = t[0],
            b = t[1],
            w = t[2],
            E = t[3],
            S = t[4];
            for ( x = 0; x < 80; x++)
                x >= 16 && (v[x] = g(v[x - 3] ^ v[x - 8] ^ v[x - 14] ^ v[x - 16], 1)),
                T = Math.floor(x / 20),
                N = g(y, 5) + C(T, b, w, E) + S + n[T] + v[x],
                S =
                E,
                E =
                w,
                w = g(b, 30),
                b =
                y,
                y =
                N;
            t[0] += y, t[1] += b, t[2] += w, t[3] += E, t[4] += S
        }
        return d(t)
    }, o
}(exports);
var exports = exports || this;
(function(e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    e.btoa = e.btoa ||
    function(e) {
        var n = 0,
            r = e.length,
            i,
            s,
            o = "";
        for (; n < r; n += 3)
            i = [e.charCodeAt(n), e.charCodeAt(n + 1), e.charCodeAt(n + 2)],
            s = [i[0] >> 2, (i[0] & 3) << 4 | i[1] >> 4, (i[1] & 15) << 2 | i[2] >> 6, i[2] & 63], isNaN(i[1]) && (s[2] = 64), isNaN(i[2]) && (s[3] = 64), o += t.charAt(s[0]) + t.charAt(s[1]) + t.charAt(s[2]) + t.charAt(s[3]);
        return o
    }

})(exports)