// Vercel serverless checkout handler for Meta Shops.
// Meta calls: /api/checkout?products=<id>%3A<qty>%2C...&coupon=<code>
// Renders the FULL cart as plain HTML (no JavaScript needed), so any
// validator — browser or plain server-side fetch — sees the products,
// quantities, prices, subtotal, and coupon.

var PRODUCTS = {
  "oz3d-01": { t: "Gravity Fed Nicotine Pouch Dispenser | 6-Tin Auto Feed PETG Desk Organizer", p: 28.99, img: "https://i.etsystatic.com/57564645/r/il/191028/7366814888/il_fullxfull.7366814888_tw2f.jpg", url: "https://www.etsy.com/listing/4410176519" },
  "oz3d-02": { t: "Slim Nicotine Pouch Container | 20-Count PETG Holder, Slide Lid (3.5 x 2.5 x 0.75 in)", p: 23.99, img: "https://i.etsystatic.com/57564645/r/il/8c2298/7519316765/il_fullxfull.7519316765_to0j.jpg", url: "https://www.etsy.com/listing/4417493901" },
  "oz3d-03": { t: "6-Tin Nicotine Pouch Organizer | PETG Desk Dispenser with Flavor Window", p: 28.99, img: "https://i.etsystatic.com/57564645/r/il/0b7759/7366805696/il_fullxfull.7366805696_7plg.jpg", url: "https://www.etsy.com/listing/4410176441" },
  "oz3d-05": { t: "3D Printed Nicotine Pouch Can Keychain Holder | Clip-On Tin Carrier (Belt Loop)", p: 16.99, img: "https://i.etsystatic.com/57564645/r/il/5b7f90/6861974854/il_fullxfull.6861974854_hlrx.jpg", url: "https://www.etsy.com/listing/4548345346" },
  "oz3d-06": { t: "3D Printed Nicotine Pouch Can Protector | Hard Shell Travel Holder (PETG)", p: 21.99, img: "https://i.etsystatic.com/57564645/r/il/dff33f/6909959513/il_fullxfull.6909959513_cgvz.jpg", url: "https://www.etsy.com/listing/4548331677" },
  "oz3d-07": { t: "6-Tin Nicotine Pouch Dispenser Holder | PETG Desk Organizer (3D Printed)", p: 28.99, img: "https://i.etsystatic.com/57564645/r/il/e269ff/7367737502/il_fullxfull.7367737502_d4hr.jpg", url: "https://www.etsy.com/listing/4399529642" },
  "oz3d-08": { t: "Knurled Grip Nicotine Pouch Holder Tin | Screw-Top PETG Case (20 Count)", p: 21.99, img: "https://i.etsystatic.com/57564645/r/il/8d986c/7481020092/il_fullxfull.7481020092_9b63.jpg", url: "https://www.etsy.com/listing/4417862076" },
  "oz3d-09": { t: "3D Printed Nicotine Pouch Tin Insert | 70mm Fresh & Used Divider (2 Compartments)", p: 15.99, img: "https://i.etsystatic.com/57564645/r/il/9a8ffd/7459121192/il_fullxfull.7459121192_sa8p.jpg", url: "https://www.etsy.com/listing/4383596031" },
  "oz3d-10": { t: "3D Printed Nicotine Pouch Keychain Case | 6-8 Count Backup Holder (Twist-Lock)", p: 16.99, img: "https://i.etsystatic.com/57564645/r/il/73266c/7525606391/il_fullxfull.7525606391_ovsi.jpg", url: "https://www.etsy.com/listing/4395407839" }
};
// Meta may send the numeric catalog product ID instead of the retailer ID.
// (Numeric IDs for the new variant items will be added after verification.)
var NUMERIC_IDS = {
  "29056335437305020": "oz3d-01",
  "28449659668060496": "oz3d-02",
  "29151847087756527": "oz3d-03",
  "28468062169525454": "oz3d-05",
  "28493177870336859": "oz3d-06",
  "39305173829081043": "oz3d-07",
  "28629259356695103": "oz3d-08",
  "29129714179960008": "oz3d-09",
  "28657296733922619": "oz3d-10"
};
// Retailer IDs from the variant feed: "<listing>-<variant>" -> base + color.
var VARIANT_IDS = {
  "4410176519-30531198171": { b: "oz3d-01", c: "Black" },
  "4410176519-30531611685": { b: "oz3d-01", c: "Grey" },
  "4410176519-30531198257": { b: "oz3d-01", c: "Blue" },
  "4410176519-30531198757": { b: "oz3d-01", c: "Orange" },
  "4410176519-30865264444": { b: "oz3d-01", c: "Red" },
  "4410176519-30531198459": { b: "oz3d-01", c: "Green" },
  "4410176519-30865687972": { b: "oz3d-01", c: "Lime Green" },
  "4410176519-28395001446": { b: "oz3d-01", c: "Light Blue" },
  "4417493901-30531141127": { b: "oz3d-02", c: "Black" },
  "4417493901-30531605579": { b: "oz3d-02", c: "Grey" },
  "4417493901-30865202336": { b: "oz3d-02", c: "Blue" },
  "4417493901-30865202346": { b: "oz3d-02", c: "Orange" },
  "4417493901-30531141131": { b: "oz3d-02", c: "Red" },
  "4417493901-30865202340": { b: "oz3d-02", c: "Green" },
  "4417493901-28193809349": { b: "oz3d-02", c: "Lime Green" },
  "4417493901-28193809351": { b: "oz3d-02", c: "Light Blue" },
  "4410176441-30531202473": { b: "oz3d-03", c: "Black" },
  "4410176441-30531612047": { b: "oz3d-03", c: "Grey" },
  "4410176441-30865268544": { b: "oz3d-03", c: "Blue" },
  "4410176441-30531203221": { b: "oz3d-03", c: "Orange" },
  "4548345346-33309910315": { b: "oz3d-05", c: null },
  "4548331677-33654394892": { b: "oz3d-06", c: null },
  "4399529642-30531206937": { b: "oz3d-07", c: "Black" },
  "4399529642-30531612347": { b: "oz3d-07", c: "Grey" },
  "4399529642-30865272998": { b: "oz3d-07", c: "Blue" },
  "4399529642-30531207489": { b: "oz3d-07", c: "Orange" },
  "4399529642-30531207419": { b: "oz3d-07", c: "Red" },
  "4399529642-30531207261": { b: "oz3d-07", c: "Green" },
  "4399529642-30531612353": { b: "oz3d-07", c: "Lime Green" },
  "4399529642-28102368534": { b: "oz3d-07", c: "Light Blue" },
  "4417862076-30531199313": { b: "oz3d-08", c: "Black" },
  "4417862076-30531611827": { b: "oz3d-08", c: "Grey" },
  "4417862076-30531199591": { b: "oz3d-08", c: "Blue" },
  "4417862076-30865266074": { b: "oz3d-08", c: "Orange" },
  "4417862076-30531200035": { b: "oz3d-08", c: "Red" },
  "4417862076-30865265798": { b: "oz3d-08", c: "Green" },
  "4417862076-28195148639": { b: "oz3d-08", c: "Lime Green" },
  "4417862076-28588707200": { b: "oz3d-08", c: "Light Blue" },
  "4383596031-30531203685": { b: "oz3d-09", c: "Black" },
  "4383596031-30865688658": { b: "oz3d-09", c: "Grey" },
  "4383596031-30865269844": { b: "oz3d-09", c: "Blue" },
  "4383596031-30865270974": { b: "oz3d-09", c: "Orange" },
  "4383596031-30865270768": { b: "oz3d-09", c: "Red" },
  "4383596031-30531204307": { b: "oz3d-09", c: "Green" },
  "4383596031-30865688664": { b: "oz3d-09", c: "Lime Green" },
  "4383596031-30865271168": { b: "oz3d-09", c: "Light Blue" },
  "MIN-BK-01": { b: "oz3d-10", c: "Black" },
  "MIN-BL-01": { b: "oz3d-10", c: "Blue" },
  "MIN-GY-01": { b: "oz3d-10", c: "Gray" },
  "MIN-GN-01": { b: "oz3d-10", c: "Green" },
  "MIN-OR-01": { b: "oz3d-10", c: "Orange" },
  "MIN-RD-01": { b: "oz3d-10", c: "Red" },
  "MIN-LY-01": { b: "oz3d-10", c: "Light Grey" },
  "MIN-LB-01": { b: "oz3d-10", c: "Light Blue" }
};
// Listing/group ID fallback (if Meta sends the bare listing ID).
var LISTING_IDS = {
  "4410176519": "oz3d-01",
  "4417493901": "oz3d-02",
  "4410176441": "oz3d-03",
  "4548345346": "oz3d-05",
  "4548331677": "oz3d-06",
  "4399529642": "oz3d-07",
  "4417862076": "oz3d-08",
  "4383596031": "oz3d-09",
  "4395407839": "oz3d-10"
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function money(n) { return "$" + n.toFixed(2); }

var CSS = "*{box-sizing:border-box;margin:0;padding:0}" +
"body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f4f4f5;color:#18181b;line-height:1.5}" +
".wrap{max-width:560px;margin:0 auto;padding:32px 20px 64px}" +
"header{text-align:center;margin-bottom:28px}header h1{font-size:24px;letter-spacing:2px}" +
"header p{color:#71717a;font-size:14px;margin-top:4px}" +
".card{background:#fff;border-radius:12px;padding:16px;margin-bottom:12px;display:flex;gap:14px;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,.06)}" +
".card img{width:72px;height:72px;object-fit:cover;border-radius:8px;flex-shrink:0}" +
".card .info{flex:1;min-width:0}.card .info .t{font-weight:600;font-size:14px}" +
".card .info .q{color:#71717a;font-size:13px;margin-top:2px}" +
".card .price{font-weight:700;white-space:nowrap}" +
".totals{background:#fff;border-radius:12px;padding:16px;margin:16px 0;box-shadow:0 1px 3px rgba(0,0,0,.06)}" +
".totals .row{display:flex;justify-content:space-between;font-size:14px;padding:4px 0}" +
".totals .grand{font-size:18px;font-weight:700;border-top:1px solid #e4e4e7;margin-top:8px;padding-top:12px}" +
".coupon{background:#fef9c3;border:1px dashed #ca8a04;border-radius:8px;padding:10px 14px;font-size:14px;margin-bottom:16px}" +
".cta{display:block;text-align:center;background:#18181b;color:#fff;text-decoration:none;font-weight:600;font-size:16px;padding:16px;border-radius:12px;margin-bottom:10px}" +
".note{text-align:center;color:#71717a;font-size:13px}" +
".empty{background:#fff;border-radius:12px;padding:32px 20px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.06)}" +
".empty p{color:#71717a;margin:8px 0 20px}";

function page(bodyHtml) {
  return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\">" +
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
    "<title>Checkout \u2014 OZ3DPrint</title><style>" + CSS + "</style></head>" +
    "<body><div class=\"wrap\"><header><h1>OZ3DPRINT</h1>" +
    "<p>Complete your purchase</p></header>" + bodyHtml + "</div></body></html>";
}

function resolveKey(key) {
  if (NUMERIC_IDS[key]) key = NUMERIC_IDS[key];
  // New variant feed retailer IDs: "<listing>-<variant>".
  if (VARIANT_IDS[key]) return { id: VARIANT_IDS[key].b, color: VARIANT_IDS[key].c };
  // Bare listing/group ID fallback.
  if (LISTING_IDS[key]) return { id: LISTING_IDS[key], color: null };
  if (PRODUCTS[key]) return { id: key, color: null };
  // Variant retailer IDs look like "oz3d-08-matte-black" — fall back to the
  // base product and surface the color in the cart line.
  var m = /^oz3d-\d+/.exec(key);
  if (m && PRODUCTS[m[0]] && key.length > m[0].length) {
    var color = key.slice(m[0].length + 1).split("-").map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(" ");
    return { id: m[0], color: color };
  }
  return null;
}

export default function handler(req, res) {
  var q = req.query || {};
  var raw = q.products || "";
  var coupon = q.coupon;
  var items = [];

  String(raw).split(",").forEach(function (entry) {
    var parts = entry.split(":");
    if (parts.length !== 2) return;
    var r = resolveKey(parts[0].trim());
    var qty = parseInt(parts[1], 10);
    if (!r || !(qty > 0)) return;
    items.push({ prod: PRODUCTS[r.id], qty: qty, color: r.color });
  });

  var bodyHtml;
  if (!items.length) {
    bodyHtml = "<div class=\"empty\"><h2>No items in your cart</h2>" +
      "<p>Your cart from Facebook or Instagram came through empty. Browse the shop to add something.</p>" +
      "<a class=\"cta\" href=\"https://www.etsy.com/shop/OZ3DPrint\">Browse OZ3DPrint on Etsy</a></div>";
  } else {
    var html = "";
    var subtotal = 0;
    items.forEach(function (it) {
      var line = it.prod.p * it.qty;
      subtotal += line;
      html += "<div class=\"card\"><img src=\"" + esc(it.prod.img) + "\" alt=\"\">" +
        "<div class=\"info\"><div class=\"t\">" + esc(it.prod.t) + "</div>" +
        "<div class=\"q\">Qty: " + it.qty + (it.color ? " &middot; " + esc(it.color) : "") + "</div></div>" +
        "<div class=\"price\">" + money(line) + "</div></div>";
    });
    html += "<div class=\"totals\"><div class=\"row\"><span>Subtotal</span><span>" + money(subtotal) + "</span></div>" +
      "<div class=\"row grand\"><span>Total</span><span>" + money(subtotal) + "</span></div></div>";
    if (coupon) {
      html += "<div class=\"coupon\">Coupon <b>" + esc(coupon) + "</b> \u2014 enter it at checkout on Etsy to apply it.</div>";
    }
    html += "<a class=\"cta\" href=\"" + esc(items[0].prod.url) + "\">Complete purchase on Etsy</a>";
    if (items.length > 1) {
      html += "<p class=\"note\">You have " + items.length + " items \u2014 each Etsy listing checks out separately.</p>";
    } else {
      html += "<p class=\"note\">Secure checkout via Etsy.</p>";
    }
    bodyHtml = html;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(page(bodyHtml));
};
