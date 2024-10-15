const viewSelection = document.querySelector("#viewSelector");

const VEHICLE_API = "http://localhost:5000/vehicles";

const addVehicle = document.querySelector("#addVehicle");
const modifyVehicle = document.querySelector("#modifyVehicle");
const deleteVehicle = document.querySelector("#deleteVehicle");

const bodyType = document.querySelector(".bdType");
const motorBikeType = document.querySelector(".mbType");
const vehicleType = document.querySelector("#vehicleType");

bodyType.style.display = "none";
motorBikeType.style.display = "none";

const addVehicleForm = document.querySelector("#addVehicleForm");
const fetchVehicleForm = document.querySelector("#fetchVehicle");
const deleteVehicleForm = document.querySelector("#deleteVehicleForm");
const modifyVehicleForm = document.querySelector("#modifyVehicleForm");

const resultBox = document.querySelector("#result");
const displayResult = (message, form) => {
  result.innerHTML = message;
  result.style.display = "block";
  setTimeout(() => {
    result.style.display = "none";
    form.reset();
  }, 2000);
};

const displayResultStr = (message) => {
  result.innerHTML = message;
  result.style.display = "block";
  setTimeout(() => {
    result.style.display = "none";
  }, 2000);
};

vehicleType.addEventListener("input", (event) => {
  const value = event.target.value;
  if (value === "Car") {
    bodyType.style.display = "block";
    motorBikeType.style.display = "none";
  } else if (value === "Motorbike") {
    bodyType.style.display = "none";
    motorBikeType.style.display = "block";
  }
});

viewSelection.addEventListener("input", (event) => {
  const value = event.target.value;
  if (value === "add") {
    addVehicle.style.display = "block";
    modifyVehicle.style.display = "none";
    deleteVehicle.style.display = "none";
  } else if (value === "modify") {
    addVehicle.style.display = "none";
    modifyVehicle.style.display = "block";
    deleteVehicle.style.display = "none";

    const modifyMbType = document.querySelector("#modifyMbType");
    const modifyBdType = document.querySelector("#modifyBdType");
    modifyVehicleForm.style.display = "none";
    modifyBdType.style.display = "none";
    modifyMbType.style.display = "none";
  } else {
    addVehicle.style.display = "none";
    modifyVehicle.style.display = "none";
    deleteVehicle.style.display = "block";
  }
});

addVehicleForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    licencePlate: event.target.licencePlate.value,
    make: event.target.make.value,
    model: event.target.model.value,
    year: event.target.year.value,
    transmission: event.target.transmission.value,
    fuelType: event.target.fuelType.value,
    engineCapacity: event.target.engineCapacity.value,
    vehicleType: event.target.vehicleType.value,
    availability: event.target.availability.value,
    bodyType: event.target.bodyType.value,
    motorBikeType: event.target.motorBikeType.value,
  };

  try {
    const res = await fetch(`${VEHICLE_API}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.error !== null) {
      throw new Error(data.error.message);
    }
    displayResult("Vehicle added successfully!", addVehicleForm);
    console.log("Add vehicle success");
  } catch (err) {
    displayResult("Error! Failed to add vehicle", addVehicleForm);
    console.log("ERROR: ", err);
  }
});

deleteVehicleForm.addEventListener("submit", async (event) => {
  event.preventDefault(); /// prevent reload
  const payload = {
    licencePlate: event.target.licencePlate.value,
  };

  try {
    const res = await fetch(`${VEHICLE_API}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.error !== null) {
      throw new Error(data.error.message);
    }
    displayResult("Vehicle deleted successfully!", deleteVehicleForm);
    console.log("Delete vehicle success");
  } catch (err) {
    displayResult("Error! Failed to delete vehicle", deleteVehicleForm);
    console.log("ERROR: ", err);
  }
});

const populateModifyVehicleForm = (data) => {
  document.querySelector("#modifyVehicleId").value = data._id;
  document.querySelector(".modifyLicencePlate").value = data.licencePlate;
  document.querySelector(".modifyMake").value = data.make;
  document.querySelector(".modifyModel").value = data.model;
  document.querySelector(".modifyYear").value = data.year;
  document.querySelector(".modifyVehicleType").value = data.vehicleType;
  document.querySelector(".modifyTransmission").value = data.transmission;
  document.querySelector(".modifyFuelType").value = data.fuelType;
  document.querySelector(".modifyEngineCapacity").value = data.engineCapacity;
  document.querySelector(".modifyAvailability").value = data.availability;
  if(data.vehicleType === 'Car') {
    document.querySelector(".modifyBodyType").value = data.bodyType;
    document.querySelector(".modifyBodyType").style.display = 'block';
    modifyBdType.style.display = 'block';
  }
  if(data.vehicleType === 'Motorbike') {
    document.querySelector(".modifyBikeType").style.display = 'block';
    document.querySelector(".modifyBikeType").value = data.motorBikeType;
    modifyMbType.style.display = 'block';
  }
};

fetchVehicleForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const licencePlate = event.target.licencePlate.value;
  console.log("fetching vehicle with licencePlate: ", licencePlate);
  try {
    const res = await fetch(`${VEHICLE_API}/fetchVehicle/${licencePlate}`);
    const resData = await res.json();
    console.log(resData);
    if (resData.error !== null && resData.error.status === 404) {
      displayResult("Error, No vehicle found!", fetchVehicleForm);
    } else {
      const vehicle = resData.data;
      console.log("vehicle: ", vehicle);
      modifyVehicleForm.style.display = "block";
      populateModifyVehicleForm(vehicle);
    }
  } catch (err) {
    displayResultStr("Error! Failed to fetch vehicles");
    console.log("ERROR: ", err);
  }
});

const modifyVehicleType = document.querySelector(".modifyVehicleType");
modifyVehicleType.addEventListener("input", (event) => {
  const type = event.target.value;
  if (type === "Car") {
    modifyBdType.style.display = "block";
    modifyMbType.style.display = "none";
  }
  if (type === "Motorbike") {
    modifyBdType.style.display = "none";
    modifyMbType.style.display = "block";
  }
});

modifyVehicleForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { target } = event;
  const payload = {
    _id: target.modifyVehicleId.value,
    licencePlate: target.licencePlate.value,
    make: target.make.value,
    model: target.model.value,
    year: target.year.value,
    transmission: target.transmission.value,
    fuelType: target.fuelType.value,
    engineCapacity: target.engineCapacity.value,
    vehicleType: target.vehicleType.value,
    availability: target.availability.value,
    bodyType: target.bodyType.value,
    motorBikeType: target.motorBikeType.value,
  };

  try {
    const res = await fetch(`${VEHICLE_API}/modify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.error !== null) {
      throw new Error(data.error.message);
    }
    displayResult("Vehicle modified successfully!", modifyVehicleForm);
    console.log("Modify vehicle success");
  } catch (err) {
    displayResult("Error! Failed to modify vehicle", modifyVehicleForm);
    console.log("ERROR: ", err);
  }

});
