// Vercel serverless checkout handler for Meta Shops.
// Meta calls: /api/checkout?products=<id>%3A<qty>%2C...&coupon=<code>
// Renders the FULL cart as plain HTML (no JavaScript needed), so any
// validator — browser or plain server-side fetch — sees the products,
// quantities, prices, subtotal, and coupon.

var PRODUCTS = {
  "oz3d-01": { t: "Gravity Fed Nicotine Pouch Dispenser | 6-Tin Auto Feed PETG Desk Organizer", p: 28.99, img: "https://i.etsystatic.com/57564645/r/il/191028/7366814888/il_fullxfull.7366814888_tw2f.jpg", url: "https://www.etsy.com/listing/4410176519/nicotine-pouch-dispenser-6-tin-petg-desk" },
  "oz3d-02": { t: "Slim Nicotine Pouch Container | 20-Count PETG Holder, Slide Lid (3.5 x 2.5 x 0.75 in)", p: 23.99, img: "https://i.etsystatic.com/57564645/r/il/8c2298/7519316765/il_fullxfull.7519316765_to0j.jpg", url: "https://www.etsy.com/listing/4417493901/rectangular-pouch-holder-with-slide-lid" },
  "oz3d-03": { t: "6-Tin Nicotine Pouch Organizer | PETG Desk Dispenser with Flavor Window", p: 28.99, img: "https://i.etsystatic.com/57564645/r/il/0b7759/7366805696/il_fullxfull.7366805696_7plg.jpg", url: "https://www.etsy.com/listing/4410176441/nicotine-pouch-dispenser-6-tin-petg-desk" },
  "oz3d-04": { t: "Custom Logo Nicotine Pouch Case | Upload Your Own Design | 3D Printed PETG (2 Colors)", p: 25.99, img: "https://i.etsystatic.com/57564645/r/il/a7a3cc/8640749119/il_fullxfull.8640749119_7rpd.jpg", url: "https://www.etsy.com/listing/4548331719/personalized-nicotine-pouch-case-custom" },
  "oz3d-05": { t: "3D Printed Nicotine Pouch Can Keychain Holder | Clip-On Tin Carrier (Belt Loop)", p: 16.99, img: "https://i.etsystatic.com/57564645/r/il/5b7f90/6861974854/il_fullxfull.6861974854_hlrx.jpg", url: "https://www.etsy.com/listing/4548345346/nicotine-pouch-can-keychain-holder-clip" },
  "oz3d-06": { t: "3D Printed Nicotine Pouch Can Protector | Hard Shell Travel Holder (PETG)", p: 21.99, img: "https://i.etsystatic.com/57564645/r/il/dff33f/6909959513/il_fullxfull.6909959513_cgvz.jpg", url: "https://www.etsy.com/listing/4548331677/nicotine-pouch-can-protector-case-hard" },
  "oz3d-07": { t: "6-Tin Nicotine Pouch Dispenser Holder | PETG Desk Organizer (3D Printed)", p: 28.99, img: "https://i.etsystatic.com/57564645/r/il/e269ff/7367737502/il_fullxfull.7367737502_d4hr.jpg", url: "https://www.etsy.com/listing/4399529642/nicotine-pouch-dispenser-6-tin-petg-desk" },
  "oz3d-08": { t: "Knurled Grip Nicotine Pouch Holder Tin | Screw-Top PETG Case (20 Count)", p: 21.99, img: "https://i.etsystatic.com/57564645/r/il/8d986c/7481020092/il_fullxfull.7481020092_9b63.jpg", url: "https://www.etsy.com/listing/4417862076/the-twist-lock-pouch-holder-rugged" },
  "oz3d-09": { t: "3D Printed Nicotine Pouch Tin Insert | 70mm Fresh & Used Divider (2 Compartments)", p: 15.99, img: "https://i.etsystatic.com/57564645/r/il/9a8ffd/7459121192/il_fullxfull.7459121192_sa8p.jpg", url: "https://www.etsy.com/listing/4383596031/70-mm-tin-insert-3d-printed-split" },
  "oz3d-10": { t: "3D Printed Nicotine Pouch Keychain Case | 6-8 Count Backup Holder (Twist-Lock)", p: 16.99, img: "https://i.etsystatic.com/57564645/r/il/73266c/7525606391/il_fullxfull.7525606391_ovsi.jpg", url: "https://www.etsy.com/listing/4395407839/mini-nicotine-pouch-keychain-pocket" }
};
// Meta may send the numeric catalog product ID instead of the retailer ID.
var NUMERIC_IDS = {
  "29056335437305020": "oz3d-01",
  "28449659668060496": "oz3d-02",
  "29151847087756527": "oz3d-03",
  "38730268933288099": "oz3d-04",
  "28468062169525454": "oz3d-05",
  "28493177870336859": "oz3d-06",
  "39305173829081043": "oz3d-07",
  "28629259356695103": "oz3d-08",
  "29129714179960008": "oz3d-09",
  "28657296733922619": "oz3d-10"
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

export default function handler(req, res) {
  var q = req.query || {};
  var raw = q.products || "";
  var coupon = q.coupon;
  var items = [];

  String(raw).split(",").forEach(function (entry) {
    var parts = entry.split(":");
    if (parts.length !== 2) return;
    var key = parts[0].trim();
    if (NUMERIC_IDS[key]) key = NUMERIC_IDS[key];
    var prod = PRODUCTS[key];
    var qty = parseInt(parts[1], 10);
    if (!prod || !(qty > 0)) return;
    items.push({ prod: prod, qty: qty });
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
        "<div class=\"q\">Qty: " + it.qty + "</div></div>" +
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
