const axios = require("axios")

const array_of_users_id = ["1", "2", "3", "4", "5"]
const array_of_category = ["lycee", "cem", "primaire"]
const array_of_theme = ["math", "physics", "arabic", "french", "english", "science", "archi", "gl", "history", "geographic", "SE", "analyse1", "algebre3", "analyse2", "THL", "RO", "PAFA"]
const array_of_mode = ["presentielle", "online"]
const array_of_description = ["<h1>google meet</h1>","<h1>instagram</h1>","<h1>discord</h1>","<h1>facebook messenger</h1>"]
const array_of_price = [1000, 2000, 3000, 4000, 5000, 6000]
const array_of_wilaya = ["Adrar","Alger","Annaba","Aïn Defla","Aïn Témouchent","Batna","Biskra","Blida","Bordj Badji Mokhtar","Bordj Bou Arreridj","Bouira","Boumerdès","Béchar","Béjaïa","Béni Abbès","Chlef","Constantine","Djanet","Djelfa","El Bayadh","El Meghaier","El Menia","El Oued","El Tarf","Ghardaïa","Guelma","Illizi","In Guezzam","In Salah","Jijel","Khenchela","Laghouat","M'Sila","Mascara","Mila","Mostaganem","Médéa","Naâma","Oran","Ouargla","Ouled Djellal","Oum El Bouaghi","Relizane","Saïda","Sidi Bel Abbès","Skikda","Souk Ahras","Sétif","Tamanrasset","Tiaret","Timimoun","Tindouf","Tipaza","Tissemsilt","Tizi Ouzou","Tlemcen","Touggourt","Tébessa"]
const array_of_adress = ["street n:1", "street n:2", "street n:3", "street n:4", "street n:5", "street n:6", "street n:7", "street n:8", "street n:9", "street n:0"]
const array_of_images = [
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thebestcolleges.org%2F17-scientifically-proven-ways-to-study-better-this-year%2F&psig=AOvVaw0oq2GcrpJ7alTFqAv_jvEb&ust=1675104210756000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKCxxJmq7fwCFQAAAAAdAAAAABAD",
    "https://www.brightoncollege.com/wp-content/uploads/2012/03/are-you-studying-properly.jpg",
    "https://summer.harvard.edu/wp-content/uploads/sites/7/2022/06/how-to-study-like-a-harvard-student.jpg",
]


function generateRandomAdvertisement() {
    const randomwilaya = array_of_wilaya[Math.floor(Math.random() * array_of_wilaya.length)]
    return {
      user_id: array_of_users_id[Math.floor(Math.random() * array_of_users_id.length)],
      category: array_of_category[Math.floor(Math.random() * array_of_category.length)],
      theme: array_of_theme[Math.floor(Math.random() * array_of_theme.length)],
      mode: array_of_mode[Math.floor(Math.random() * array_of_mode.length)],
      description: array_of_description[Math.floor(Math.random() * array_of_description.length)],
        price: array_of_price[Math.floor(Math.random() * array_of_price.length)],
        wilaya: randomwilaya,
        commune: randomwilaya,
        adress: array_of_adress[Math.floor(Math.random() * array_of_adress.length)],
        images: array_of_images
    }
}

async function SeedOneAdvertisement() {
    const response = await axios.post("http://127.0.0.1:5000/new-advertisement", generateRandomAdvertisement())
}

const SeedAdvertisements = async () => {
    for (let i = 0; i < 100; i++) {
      console.log("i: ", i);
        await SeedOneAdvertisement();
    }
}
SeedAdvertisements();