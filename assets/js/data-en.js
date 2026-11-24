/* Pathora: terjemahan Inggris untuk katalog kegiatan.
   Hanya teks yang dibaca tamu yang diganti. Nama host, nama tempat, kategori, wilayah,
   dan data logika tidak diubah supaya pencocokan akun host dan filter tetap jalan.
   Kata kunci Inggris ditambahkan ke kw supaya pencarian bahasa Inggris tetap menemukan kegiatan. */
(function (g) {
  'use strict';
  const EN = {
    tukik: {
      name: 'Turtle hatchery class: sea turtle conservation', short: 'Turtle hatchery class',
      story: 'On a morning or late afternoon at Serangan beach, you stand beside the hatchery pools where locals guard turtle eggs until they hatch. Rangers teach you how to read nest markers and record hatchling data. As the sun starts to dip, hatchlings that are ready are released into the sea, and you walk them down to their first wave.',
      hl: ['See eggs and hatchlings up close with conservation rangers', 'Help record hatchling data used for monitoring', 'Release hatchlings into the sea when the moment is right'],
      fit: 'Great for families with kids, animal lovers, and anyone curious about how Bali\'s beaches are protected.',
      steps: ['Meet the team and say hello', 'Learn about turtle species and their life cycle', 'See the hatchery pools and eggs', 'Release hatchlings to the sea, if any have hatched', 'Chat over a cup of tea'],
      ethics: ['Do not touch eggs or hatchlings without the guide\'s direction', 'No flash photography and no single-use plastic', 'Dress modestly when passing near a temple'],
      bring: ['Hat and sunscreen', 'Sandals that slip off easily', 'Refillable water bottle', 'Clothes that can get wet'],
      meet: 'Turtle hatchery centre, Serangan',
      contrib: 'Part of the proceeds goes to feed and care for the hatchlings. Information from the host.',
      lang: 'Indonesian, Balinese, English',
      kw: ['turtle', 'hatchling', 'sea', 'beach', 'animals', 'wildlife', 'conservation']
    },
    mangrove: {
      name: 'Mangrove planting and mangrove forest walk', short: 'Mangrove planting',
      story: 'A wooden boardwalk takes you into the dense mangrove forest where crabs, birds, and small fish take shelter. Your guide explains why mangrove roots hold back erosion, then you plant a seedling that can be followed through your Nature Passport.',
      hl: ['Walk the boardwalk between mangrove roots', 'Plant a mangrove seedling with your own hands', 'Spot birds and swamp life at low tide'],
      fit: 'Great for nature lovers who enjoy calm places and want to leave something that grows.',
      steps: ['Meet and short introduction', 'Walk the mangrove boardwalk', 'Plant a mangrove seedling', 'Fresh coconut with the farmers\' group'],
      ethics: ['Stay on the boardwalk', 'Take your trash home', 'Do not pick propagules that have not been planted'],
      bring: ['Closed shoes that can get dirty', 'Mosquito repellent', 'Hat'],
      meet: 'Ngurah Rai Forest Park gate, east trail',
      contrib: 'Seedling and care costs are covered by ticket sales. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['mangrove', 'forest', 'plant', 'tree', 'bird', 'kayak', 'planting']
    },
    subak: {
      name: 'Morning walk through terraced rice fields and learning about subak', short: 'Morning subak walk',
      story: 'You walk slowly between terraced rice paddies while morning mist still hangs in the air. A village guide shows how subak shares water fairly from upstream to downstream, all the way to the small temple where farmers give thanks to the water. The walk ends with coffee and local snacks at a farmer\'s home.',
      hl: ['Walk along the paddy ridges while the air is still cool', 'Understand subak, a living world heritage system', 'Breakfast or coffee at a farmer\'s home'],
      fit: 'Great for travellers who love early mornings, photographers, and parents who want to show their kids a rice field.',
      steps: ['Meet up, ginger tea', 'Walk along the paddy ridges', 'Learn how water is shared and about the subak temple', 'Nasi jinggo breakfast at a village warung'],
      ethics: ['Walk only on the ridges the guide points out', 'Do not pick the rice', 'Dress modestly when passing the subak temple'],
      bring: ['Comfortable shoes', 'Light jacket', 'Hat and sunscreen'],
      meet: 'Pekaseh warung, Jatiluwih',
      contrib: 'Part goes to maintaining the subak channels. Information from the host.',
      lang: 'Indonesian, Balinese, English',
      kw: ['subak', 'rice field', 'paddy', 'terrace', 'walk', 'trekking', 'morning', 'water', 'irrigation']
    },
    burung: {
      name: 'Morning birdwatching in West Bali', short: 'Birdwatching',
      story: 'Before the sun gets high, you enter the edge of the West Bali forest with a guide who knows every bird by its call. Binoculars are lent to you, steps are slow, and every sighting is logged. With a little luck, you see the Bali starling in its natural habitat.',
      hl: ['Recognise birds by their calls with a local guide', 'Borrow binoculars and a field guide', 'Submit your sightings to eBird under your name'],
      fit: 'Great for birdwatchers, beginners and experienced alike, and anyone who wants quiet and does not mind an early start.',
      steps: ['Meet before sunrise', 'Quiet walk along the forest edge', 'Log sightings with the guide', 'Breakfast and local coffee'],
      ethics: ['Speak softly and never call birds with recordings', 'Wear neutral-coloured clothes', 'Do not feed wildlife'],
      bring: ['Binoculars if you have them', 'Closed shoes', 'Mosquito repellent'],
      meet: 'Sumberklampok ranger post',
      contrib: 'Guide fees and village forest patrols. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['birdwatching', 'bird', 'forest', 'west', 'starling', 'wildlife', 'ebird']
    },
    airterjun: {
      name: 'Morning trek to a hidden waterfall', short: 'Hidden waterfall',
      story: 'A dirt trail slopes down through coffee and clove gardens, then damp forest where the sound of water grows louder. At the end waits a waterfall that rarely makes it into tourist brochures. You can swim for a bit, climb back up, and close the morning with warm coffee at a villager\'s home.',
      hl: ['Trek downhill through coffee and clove gardens', 'Swim in a quiet waterfall pool', 'Warm coffee at a villager\'s home before heading back'],
      fit: 'Great for reasonably fit travellers who like the outdoors. Less suitable for small children.',
      steps: ['Meet and light warm-up', 'Walk down through coffee and clove gardens', 'Rest and swim at the waterfall', 'Climb back up, coffee at a villager\'s home'],
      ethics: ['No soap or shampoo in the water', 'Do not leave any trash', 'Follow the trail and the guide\'s directions'],
      bring: ['Trekking shoes', 'Change of clothes', 'Light rain jacket'],
      meet: 'Munduk village hall',
      contrib: 'Village youth fund for trail maintenance. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['waterfall', 'trekking', 'forest', 'munduk', 'hiking', 'walk']
    },
    canang: {
      name: 'Making canang and learning about offerings', short: 'Making canang',
      story: 'You sit cross-legged with the women who make the daily offerings, learning to fold palm leaf and arrange flowers by colour and direction. Every flower has its place and meaning. Once your canang is done, you place it at the family shrine, just as locals do every morning.',
      hl: ['Assemble a canang from palm leaf and fresh flowers', 'Learn what flower colours and directions mean', 'Place your canang at the family shrine'],
      fit: 'Great for anyone who wants to understand everyday Balinese life, including families with children.',
      steps: ['Say hello and have tea', 'Learn the meaning of flowers and directions', 'Make your own canang', 'Place your canang at the family shrine'],
      ethics: ['Women who are menstruating are not asked to place the offering', 'Wear a sarong and sash', 'Do not step over a canang'],
      bring: ['Modest clothing', 'A sarong if you have one, or borrow one'],
      meet: 'Griya Bunga, Jalan Hanoman, Ubud',
      contrib: 'Fees for the offering makers and the banjar fund. Information from the host.',
      lang: 'Indonesian, Balinese, English',
      kw: ['canang', 'offering', 'ceremony', 'culture', 'ubud', 'flower', 'tradition', 'hindu']
    },
    tenun: {
      name: 'Discovering gringsing weaving in Tenganan', short: 'Gringsing weaving',
      story: 'In Tenganan, a Bali Aga village, gringsing cloth is made with double ikat, a technique that survives in Indonesia only here. A single piece can take years. You see natural dyeing, learn from the weavers, and try weaving a few rows with your own hands.',
      hl: ['Watch double ikat being made by the weavers themselves', 'Learn about natural dyes from roots and bark', 'Try a few rows on a real loom'],
      fit: 'Great for craft, textile, and history lovers. It takes place indoors, so it is rain-proof.',
      steps: ['Meet the weavers and see natural dyeing', 'Learn gringsing patterns and meanings', 'Try weaving', 'Walk around the village with a guide'],
      ethics: ['Ask permission before photographing people and their work', 'Wear a sarong and sash', 'Do not touch cloth that is being worked on'],
      bring: ['Modest clothing', 'Cash if you would like to buy cloth'],
      meet: 'Tenganan village gate',
      contrib: 'Part of the proceeds goes to the weavers\' group fund. Information from the host.',
      lang: 'Indonesian, Balinese',
      kw: ['weaving', 'gringsing', 'tenganan', 'cloth', 'craft', 'textile', 'culture', 'village']
    },
    masak: {
      name: 'Cooking Balinese spice paste with a farmer', short: 'Balinese cooking',
      story: 'The morning begins in the garden, picking ginger, turmeric, and lemongrass that will become the spice paste. You pound base genep in a stone mortar, then cook lunch with the farmer\'s family. Everything comes from the same garden, and everything is eaten together at the end of the class.',
      hl: ['Pick spices straight from the garden', 'Pound base genep with a stone mortar', 'Share lunch with the farmer\'s family, made from your own cooking'],
      fit: 'Great for food lovers, couples, and families. A vegetarian menu can be prepared, just tell the host.',
      steps: ['Tour the spice garden', 'Pound base genep', 'Cook together', 'Lunch in the bamboo pavilion'],
      ethics: ['Wash your hands before entering the kitchen', 'Tell the host about allergies', 'Finish your food'],
      bring: ['An empty stomach', 'Aprons are provided'],
      meet: 'Pejeng spice garden',
      contrib: 'Ingredients are bought from nearby farmers. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['cooking', 'food', 'spice', 'farmer', 'garden', 'lawar', 'class']
    },
    bebek: {
      name: 'Releasing ducks into the rice fields with farmers', short: 'Ducks in the rice field',
      story: 'Late in the afternoon, you join Penebel farmers herding ducks into a freshly harvested paddy. The ducks eat pests and enrich the soil, so farmers need no pesticides. You learn why rice and ducks look after each other, then sit in a field hut with tea and the evening sky.',
      hl: ['Herd ducks through the paddy with the farmers', 'Learn pesticide-free farming through practice', 'Sit in a field hut and wait for dusk'],
      fit: 'Great for families with kids and anyone who wants a relaxed afternoon in the rice fields.',
      steps: ['Meet on the paddy ridge', 'Herd the ducks into the paddy plot', 'Learn about integrated farming', 'Ginger drink while watching the sun go down'],
      ethics: ['Do not chase the ducks', 'Do not enter plots the farmers have not opened', 'Take your trash home'],
      bring: ['Sandals or shoes that can get dirty', 'Hat'],
      meet: 'Penebel farmers\' hut',
      contrib: 'All proceeds go to the farmers\' group. Information from the host.',
      lang: 'Indonesian, Balinese',
      kw: ['duck', 'rice field', 'farmer', 'kids', 'penebel', 'afternoon', 'cheap']
    },
    kopi: {
      name: 'Picking and roasting coffee in a Kintamani garden', short: 'Kintamani coffee',
      story: 'In the orange and coffee gardens on the slopes of Kintamani, you pick ripe red coffee cherries, dry them, then roast them in a clay stove. The result is brewed on the spot and enjoyed while looking across to the Batur caldera.',
      hl: ['Pick red coffee cherries from the tree', 'Roast traditionally in a clay stove', 'Brew and enjoy your own coffee'],
      fit: 'Great for coffee lovers and travellers looking for cool highland air.',
      steps: ['Introduction to the intercropped garden', 'Pick coffee', 'Roast and grind', 'Brew and taste'],
      ethics: ['Pick only the red cherries', 'Do not step on young plants'],
      bring: ['Jacket (cold in the morning)', 'Closed shoes'],
      meet: 'Subak Abian hut',
      contrib: 'Part goes to coffee nursery work by the village youth. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['coffee', 'kintamani', 'garden', 'roast', 'food', 'cold', 'highland']
    },
    gerabah: {
      name: 'Making pottery in Pejaten village', short: 'Pottery making',
      story: 'In a family workshop passed down through generations, you work the clay, spin it on a wheel, and shape your first bowl. The potter guides you patiently. Your piece is fired and can be picked up or shipped once ready.',
      hl: ['Shape a bowl on the wheel with the potter', 'Learn about clay and the traditional kiln', 'Take your own piece home'],
      fit: 'Great for handicraft lovers, couples, and families with older children.',
      steps: ['Meet the clay and tools', 'Shape on the wheel', 'Decorate and mark your piece', 'Tea and local cake'],
      ethics: ['Ask permission before photographing the workshop', 'Wear clothes that can get dirty'],
      bring: ['Clothes that can get dirty'],
      meet: 'Pejaten pottery workshop',
      contrib: 'Potters\' fees and clay materials. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['pottery', 'ceramic', 'clay', 'pejaten', 'craft', 'tabanan', 'making']
    },
    karang: {
      name: 'Planting coral with Pemuteran fishermen', short: 'Coral planting',
      story: 'On a small fishing boat from Pemuteran, you head out to the coral nursery. On land, you assemble coral fragments onto frames. Then you snorkel to plant them on the seabed. The day ends with grilled fish together with the fishermen.',
      hl: ['Assemble coral fragments onto nursery frames', 'Snorkel and plant coral on the seabed', 'Share grilled fish with the fishermen'],
      fit: 'Great for sea lovers who are comfortable swimming. Snorkel gear is provided.',
      steps: ['Briefing and borrow snorkel gear', 'Assemble coral fragments', 'Snorkel and plant coral', 'Grilled fish with the fishermen'],
      ethics: ['Do not touch live coral', 'Use reef-friendly sunscreen', 'Follow the guide\'s directions'],
      bring: ['Swimwear', 'Reef-friendly sunscreen', 'Towel'],
      meet: 'Pemuteran beach, fishermen\'s post',
      contrib: 'Seedling costs and coral frame maintenance. Information from the host.',
      lang: 'Indonesian, English',
      kw: ['coral', 'snorkel', 'sea', 'reef', 'pemuteran', 'fisherman', 'dive']
    },
    melukat: {
      name: 'Melukat at the holy water temple in Tampaksiring', short: 'Melukat at the water temple',
      story: 'Melukat is a purification with holy water, and in Tampaksiring the ritual has been practised for centuries. Before the temple gets busy, a village guide helps you dress in traditional clothes, prepare a canang, and explains the order of the spouts before you follow it quietly. Groups are kept small on purpose so the atmosphere stays reverent.',
      hl: ['Wear traditional cloth and follow the order of the spouts with guidance', 'Learn what melukat means directly from local people', 'Small group in the morning, before the temple gets busy'],
      fit: 'Great for visitors who want to follow the tradition respectfully. This is not a photo attraction, so phones stay away.',
      steps: ['Meet, change into traditional cloth, and prepare a canang', 'Explanation of the meaning and order of the spouts', 'Melukat with the guide\'s direction', 'Sit quietly with ginger tea at the village hall'],
      ethics: ['Wear the sarong and sash provided', 'No photos during the ritual', 'Women who are menstruating do not take part in melukat', 'Follow the priest\'s and guide\'s directions'],
      bring: ['Swimwear underneath or a change of clothes', 'Small towel', 'Waterproof pouch for valuables'],
      meet: 'Village parking area, Manukaya, Tampaksiring',
      contrib: 'Temple cleaning fund and banjar fund. Information from the host.',
      lang: 'Indonesian, Balinese, English',
      kw: ['melukat', 'purification', 'temple', 'holy water', 'culture', 'tampaksiring', 'spiritual', 'hindu']
    },
    topeng: {
      name: 'Learning mask dance with a village dance studio', short: 'Mask dance',
      story: 'In Mas, a village of mask carvers, a mask is not a souvenir but a character that dances. Studio dancers introduce the mask characters, show how masks are carved and painted, then teach the basic movements used in performances. The afternoon closes with a short performance by the studio\'s children.',
      hl: ['Hold and try locally carved masks', 'Learn basic mask dance movements from studio dancers', 'Watch a short performance by village children'],
      fit: 'Great for performing arts lovers, families with children, and anyone who wants to see Balinese culture still alive in the village.',
      steps: ['Welcome and introduction to mask characters', 'See masks being carved and painted', 'Learn basic movements with the dancers', 'Short performance and group photo'],
      ethics: ['Never put a mask on the floor', 'Ask permission before photographing the dancers', 'Dress modestly'],
      bring: ['Clothes that are comfortable to move in', 'A sarong if you have one, or borrow one'],
      meet: 'Banjar hall, Mas, Ubud',
      contrib: 'Dancers\' fees and upkeep of the studio\'s equipment. Information from the host.',
      lang: 'Indonesian, Balinese, English',
      kw: ['mask', 'dance', 'studio', 'culture', 'mas', 'gianyar', 'art', 'performance']
    }
  };

  /* terapkan hanya bila bahasa EN aktif */
  if (!(g.I18N && g.I18N.lang === 'en') || !g.PD) return;
  g.PD.A.forEach((a) => {
    const e = EN[a.id]; if (!e) return;
    a.name = e.name; a.short = e.short; a.story = e.story; a.hl = e.hl; a.fit = e.fit;
    a.ethics = e.ethics; a.bring = e.bring; a.meet = e.meet; a.contrib = e.contrib;
    a.steps = a.steps.map((s, i) => [s[0], e.steps[i] || s[1]]);
    a.host = Object.assign({}, a.host, { lang: e.lang });
    a.kw = a.kw.concat(e.kw);
  });
  g.PD.EN_CATALOG = EN;
})(window);
