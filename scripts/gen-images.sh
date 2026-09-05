#!/bin/bash
# Robust image generation with per-image timeout + retry.
cd /home/z/my-project/public/images || exit 1
LOG=/home/z/my-project/gen-images.log

gen() {
  local prompt="$1"; local out="$2"; local size="${3:-1344x768}"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "SKIP (exists): $out" | tee -a "$LOG"
    return 0
  fi
  for attempt in 1 2 3; do
    echo "GEN (attempt $attempt): $out" | tee -a "$LOG"
    if timeout 120 z-ai image -p "$prompt" -o "$out" -s "$size" >> "$LOG" 2>&1; then
      if [ -f "$out" ] && [ -s "$out" ]; then
        echo "OK: $out ($(stat -c%s "$out") bytes)" | tee -a "$LOG"
        return 0
      fi
    fi
    echo "FAIL attempt $attempt: $out" | tee -a "$LOG"
    sleep 3
  done
  return 1
}

gen "Wholesale vegetable market in India, fresh green vegetables tomatoes onions leafy greens cauliflower in large crates and sacks, busy mandi yard, natural daylight, professional documentary photography, high detail" "./apmc/vegetable-market.png"
gen "Wholesale grain market in India, sacks and heaps of wheat rice grains lentils stacked in a wholesale grain mandi warehouse, warm light, professional documentary photography, high detail" "./apmc/grain-market.png"
gen "Wholesale spice market in India, colorful mounds of red chili turmeric coriander cumin spices in open sacks, vibrant powders, traditional spice bazaar, warm light, professional documentary photography, high detail" "./apmc/spice-market.png"
gen "Wholesale onion and potato market in India, large jute sacks filled with onions and potatoes stacked in a wholesale mandi yard, earthy tones, natural daylight, professional documentary photography, high detail" "./apmc/onion-potato-market.png"
gen "Wide view of a large Indian APMC wholesale agricultural market yard, rows of covered trading sheds, trucks and tempos loading produce, busy morning atmosphere, overcast soft light, professional architectural documentary photography, high detail" "./apmc/market-yard.png" "1440x720"
gen "Golden wheat field at sunrise in rural India, ripe grain ears close, agricultural landscape, warm golden hour light, professional landscape photography, high detail" "./kirti-rana/agriculture.png"
gen "Wide shot of an elegant Indian business conference hall stage with podium, backdrop banners and flowers, empty stage before a merchant chamber event, warm professional lighting, architectural photography, high detail, no people" "./events/conference.png" "1440x720"
gen "Elegant business meeting setup in India, round table with notepads water glasses and microphones, soft natural light through large windows, professional corporate interior photography, no people, high detail" "./events/trade-meeting.png"
gen "Ceremonial stage with floral garlands and a felicitation shawl draped over a chair, warm stage lighting, Indian business event ambiance, professional photography, no people, high detail" "./events/felicitations.png"
gen "Traditional Indian merchant community gathering hall, rows of chairs with covers, decorated backdrop, soft event lighting before a community meeting, professional photography, no people, high detail" "./events/community.png"
gen "Aged vintage newspaper texture background, slightly yellowed newsprint paper, subtle text columns blurred, soft warm light, high resolution paper texture, no readable text" "./media/newspaper-texture.png"

echo "ALL DONE" | tee -a "$LOG"
ls -la apmc events kirti-rana media
