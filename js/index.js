const input = document.querySelector('#input')
const submit = document.querySelector('[type=submit]')
const findIPButton = document.querySelector('#getIp')
const mapId = document.querySelector('#mapid')
const infoBar = document.querySelector('.infoBar')
const ipAddress = document.querySelector('.ipAddress')
const locations = document.querySelector('.location')
const flag = document.querySelector('.flag')
const isp = document.querySelector('.isp')
let mymap = L.map('mapid').setView([51.501, -0.09], 13)

let pin = L.marker([51.505, -0.09]).addTo(mymap)
console.log(mymap)

const tileUrl =
  'https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=a20376a72bc24096b7e19988b9445835'

L.tileLayer(tileUrl, {
  attribution:
    'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data <a href="https://www.osm.org/copyright">OpenStreetMap contributors </a> ',
}).addTo(mymap)

// Get my IP Address and put it in the search bar

const findMyIp = async e => {
  e.preventDefault()
  let myIp = 'https://api.ipify.org?format=json'
  try {
    const res = await axios.get(myIp)
    const data = res.data
    input.value = data.ip
  } catch (err) {
    console.error(err)
  }
}
findIPButton.addEventListener('click', findMyIp)

// Use the IP Address retrieved from the API and display its info

const getInfo = async e => {
  e.preventDefault()
  let inputVal = input.value
  if (!inputVal) return

  const endpoint = `https://api.ipgeolocation.io/ipgeo?apiKey=3de00b4e357c47a3b28e8a8f578f7689&ip=${inputVal}`
  try {
    const res = await axios.get(endpoint)
    const IPs = res.data
    let lat = IPs.latitude
    let long = IPs.longitude
    console.log(lat, long)
    mymap.setView([lat, long], 13)
    pin = L.marker([lat, long]).addTo(mymap)

    infoBar.style.display = 'flex'
    ipAddress.innerHTML = IPs.ip
    locations.innerHTML = `${IPs.city}, ${IPs.country_name} </br> ${IPs.zipcode}`
    flag.innerHTML = `<img src='${IPs.country_flag}' />`
    isp.innerHTML = `${IPs.isp}`
    infoBar.style.zIndex = '1'
  } catch (err) {
    console.error(err)
  }
}
submit.addEventListener('click', getInfo)
