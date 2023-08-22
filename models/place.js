export class Place {
  constructor(title, imageUri, address, location) {
    this.title = title
    this.imageUri = imageUri
    this.address = address
    this.location = location // {lat: 0.3242, lng: 0.4566}
    this.id = new Date().toString() + Math.random().toString()
  }
}
