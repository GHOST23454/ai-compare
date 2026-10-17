import { Tool } from '@/types';

export const tools: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    cat: 'Yazı',
    icon: 'MessageSquare',
    color: 'from-emerald-500 to-teal-500',
    rating: 4.9,
    desc: {
      tr: 'En popüler konuşma AI asistanı.',
      en: 'The most popular conversational AI assistant.',
    },
    longDesc: {
      tr: 'OpenAI tarafından geliştirilen ChatGPT, doğal dil işleme konusunda dünyanın en yaygın kullanılan yapay zekası. Metin yazma, kod yazma, analiz, çeviri ve yaratıcı içerik üretimi gibi birçok alanda kullanılıyor.',
      en: 'Developed by OpenAI, ChatGPT is the world\'s most widely used AI for natural language processing. It is used in many areas such as writing text, coding, analysis, translation, and creative content generation.',
    },
    tag: 'Ücretsiz',
    price: 'Ücretsiz / $20 ay',
    website: 'https://chat.openai.com',
    features: {
      tr: ['Metin üretimi', 'Kod yazma', 'Görsel analiz', 'Sesli konuşma', 'Dosya yükleme'],
      en: ['Text generation', 'Code writing', 'Image analysis', 'Voice chat', 'File upload'],
    },
    pros: {
      tr: ['Çok yönlü', 'Hızlı', 'Geniş entegrasyon'],
      en: ['Versatile', 'Fast', 'Wide integration'],
    },
    cons: {
      tr: ['Bazen halüsinasyon', 'Ücretli plan gerekebilir'],
      en: ['Sometimes hallucinates', 'Paid plan may be needed'],
    },
  },
  {
    id: 'claude',
    name: 'Claude',
    cat: 'Yazı',
    icon: 'Brain',
    color: 'from-orange-500 to-amber-500',
    rating: 4.8,
    desc: {
      tr: 'Uzun metinler ve analizde güçlü.',
      en: 'Powerful for long texts and analysis.',
    },
    longDesc: {
      tr: 'Anthropic tarafından geliştirilen Claude, özellikle uzun belgeler ile çalışma ve karmaşık analizlerde öne çıkıyor.',
      en: 'Developed by Anthropic, Claude stands out especially for working with long documents and complex analysis.',
    },
    tag: 'Ücretsiz',
    price: 'Ücretsiz / $20 ay',
    website: 'https://claude.ai',
    features: {
      tr: ['200K token bağlam', 'Kod yazma', 'Belge analizi', 'Görsel analiz'],
      en: ['200K token context', 'Code writing', 'Document analysis', 'Image analysis'],
    },
    pros: {
      tr: ['Çok uzun bağlam', 'Güvenli', 'Doğal yanıtlar'],
      en: ['Very long context', 'Safe', 'Natural responses'],
    },
    cons: {
      tr: ['Bazı ülkelerde sınırlı', 'Görsel üretimi yok'],
      en: ['Limited in some countries', 'No image generation'],
    },
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    cat: 'Görsel',
    icon: 'Image',
    color: 'from-purple-500 to-pink-500',
    rating: 4.7,
    desc: {
      tr: 'Sanatsal görsel üretimde zirve.',
      en: 'The peak of artistic image generation.',
    },
    longDesc: {
      tr: 'Midjourney, sanatsal ve estetik görsel üretiminde dünyanın en iyi AI aracı olarak kabul ediliyor.',
      en: 'Midjourney is considered the world\'s best AI tool for artistic and aesthetic image generation.',
    },
    tag: 'Ücretli',
    price: '$10 ay',
    website: 'https://midjourney.com',
    features: {
      tr: ['Sanatsal görseller', 'Stil transferi', 'Yüksek çözünürlük', 'Varyasyonlar'],
      en: ['Artistic images', 'Style transfer', 'High resolution', 'Variations'],
    },
    pros: {
      tr: ['En kaliteli görseller', 'Sanatsal derinlik'],
      en: ['Highest quality images', 'Artistic depth'],
    },
    cons: {
      tr: ['Ücretsiz plan yok', 'Discord üzerinden'],
      en: ['No free plan', 'Via Discord'],
    },
  },
  {
    id: 'dalle',
    name: 'DALL·E 3',
    cat: 'Görsel',
    icon: 'Palette',
    color: 'from-cyan-500 to-blue-500',
    rating: 4.6,
    desc: {
      tr: "OpenAI'nin görsel üretim modeli.",
      en: "OpenAI's image generation model.",
    },
    longDesc: {
      tr: 'DALL·E 3, ChatGPT ile entegre çalışan, metinden görsel üreten güçlü bir AI modeli.',
      en: 'DALL·E 3 is a powerful AI model that works integrated with ChatGPT and generates images from text.',
    },
    tag: 'Freemium',
    price: 'ChatGPT Plus ile',
    website: 'https://openai.com/dall-e-3',
    features: {
      tr: ['Metinden görsel', 'ChatGPT entegre', 'Detaylı prompt anlama'],
      en: ['Text to image', 'ChatGPT integrated', 'Detailed prompt understanding'],
    },
    pros: {
      tr: ['Kolay kullanım', 'İyi prompt anlama'],
      en: ['Easy to use', 'Good prompt understanding'],
    },
    cons: {
      tr: ['Midjourney kadar sanatsal değil'],
      en: ['Not as artistic as Midjourney'],
    },
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    cat: 'Kod',
    icon: 'Code',
    color: 'from-slate-500 to-gray-700',
    rating: 4.7,
    desc: {
      tr: 'Kod yazarken yanında olan AI.',
      en: 'The AI that sits beside you while coding.',
    },
    longDesc: {
      tr: 'GitHub Copilot, VS Code gibi editörlerde kod yazarken otomatik tamamlama yapan AI asistanı.',
      en: 'GitHub Copilot is an AI assistant that provides autocompletion while writing code in editors like VS Code.',
    },
    tag: 'Ücretli',
    price: '$10 ay',
    website: 'https://github.com/features/copilot',
    features: {
      tr: ['Kod tamamlama', 'Çoklu dil', 'Test üretimi', 'Açıklama'],
      en: ['Code completion', 'Multi-language', 'Test generation', 'Explanation'],
    },
    pros: {
      tr: ['Hız', 'Çok dilli', 'Editör entegrasyonu'],
      en: ['Speed', 'Multi-language', 'Editor integration'],
    },
    cons: {
      tr: ['Aylık ücret', 'Bazı dillerde zayıf'],
      en: ['Monthly fee', 'Weak in some languages'],
    },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    cat: 'Kod',
    icon: 'Terminal',
    color: 'from-indigo-500 to-purple-500',
    rating: 4.8,
    desc: {
      tr: 'AI destekli kod editörü.',
      en: 'AI-powered code editor.',
    },
    longDesc: {
      tr: 'Cursor, VS Code tabanlı, yapay zeka odaklı kod editörü. Tüm projeyi anlar ve birlikte kod yazar.',
      en: 'Cursor is a VS Code-based, AI-focused code editor. It understands the entire project and writes code with you.',
    },
    tag: 'Freemium',
    price: 'Ücretsiz / $20 ay',
    website: 'https://cursor.com',
    features: {
      tr: ['Tüm proje bağlamı', 'Doğal dille kod', 'Chat entegre', 'Multi-model'],
      en: ['Full project context', 'Code with natural language', 'Integrated chat', 'Multi-model'],
    },
    pros: {
      tr: ['Muhteşem bağlam', 'Hızlı', 'Akıllı'],
      en: ['Amazing context', 'Fast', 'Smart'],
    },
    cons: {
      tr: ['Öğrenme eğrisi'],
      en: ['Learning curve'],
    },
  },
  {
    id: 'suno',
    name: 'Suno',
    cat: 'Ses',
    icon: 'Music',
    color: 'from-pink-500 to-rose-500',
    rating: 4.5,
    desc: {
      tr: 'Saniyeler içinde şarkı üret.',
      en: 'Generate songs in seconds.',
    },
    longDesc: {
      tr: 'Suno, sözleri ve melodiyle birlikte tam şarkılar üreten yapay zeka.',
      en: 'Suno is an AI that generates complete songs with lyrics and melody.',
    },
    tag: 'Freemium',
    price: 'Ücretsiz / $8 ay',
    website: 'https://suno.com',
    features: {
      tr: ['Şarkı üretimi', 'Vokal', 'Çoklu tür', 'Söz yazma'],
      en: ['Song generation', 'Vocals', 'Multiple genres', 'Lyric writing'],
    },
    pros: {
      tr: ['Eğlenceli', 'Hızlı', 'Kaliteli'],
      en: ['Fun', 'Fast', 'High quality'],
    },
    cons: {
      tr: ['Ticari haklar ücretli'],
      en: ['Commercial rights are paid'],
    },
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    cat: 'Ses',
    icon: 'Mic',
    color: 'from-violet-500 to-purple-600',
    rating: 4.8,
    desc: {
      tr: 'Gerçekçi AI seslendirme.',
      en: 'Realistic AI voiceover.',
    },
    longDesc: {
      tr: 'ElevenLabs, insan sesinden ayırt edilemeyecek kadar doğal AI seslendirme sunuyor.',
      en: 'ElevenLabs offers AI voiceover so natural it is indistinguishable from human voice.',
    },
    tag: 'Freemium',
    price: 'Ücretsiz / $5 ay',
    website: 'https://elevenlabs.io',
    features: {
      tr: ['Ses klonlama', '30+ dil', 'Duygu tonu', 'API'],
      en: ['Voice cloning', '30+ languages', 'Emotion tone', 'API'],
    },
    pros: {
      tr: ['En doğal ses', 'Çok dilli', 'API'],
      en: ['Most natural voice', 'Multi-language', 'API'],
    },
    cons: {
      tr: ['Karakter sınırı'],
      en: ['Character limit'],
    },
  },
  {
    id: 'runway',
    name: 'Runway',
    cat: 'Video',
    icon: 'Video',
    color: 'from-amber-500 to-red-500',
    rating: 4.5,
    desc: {
      tr: 'AI ile video üret ve düzenle.',
      en: 'Generate and edit video with AI.',
    },
    longDesc: {
      tr: 'Runway, video üretimi, düzenleme ve efektler için AI destekli profesyonel bir araç.',
      en: 'Runway is an AI-powered professional tool for video generation, editing, and effects.',
    },
    tag: 'Freemium',
    price: 'Ücretsiz / $15 ay',
    website: 'https://runwayml.com',
    features: {
      tr: ['Text-to-video', 'Green screen', 'Motion brush', 'Ses üretimi'],
      en: ['Text-to-video', 'Green screen', 'Motion brush', 'Audio generation'],
    },
    pros: {
      tr: ['Profesyonel', 'Çok araç'],
      en: ['Professional', 'Many tools'],
    },
    cons: {
      tr: ['Öğrenme eğrisi', 'Kısa klipler'],
      en: ['Learning curve', 'Short clips'],
    },
  },
];