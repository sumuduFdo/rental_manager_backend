export class Vehicle {

  constructor(licencePlate, make, model, year, vehicleType, options = {}) {
    this.licencePlate = licencePlate;
    this.make = make;
    this.model = model;
    this.year = year;
    this.vehicleType = vehicleType;
    this.bodyType = this.vehicleType === "car" ? options.bodyType : undefined;
    this.fuelType = this.vehicleType === "car" ? options.fuelType : undefined;
    this.motorBikeType = this.vehicleType === 'motorbike' ? options.motorBikeType : undefined;
  }

  getAge(currentYear) {
    return currentYear - this.year;
  }
}