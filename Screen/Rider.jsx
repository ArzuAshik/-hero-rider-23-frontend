import Button from "@/components/Button";

export default function Rider({ user }) {
  const { area, vlnumber, model, brand, drivingLicence } = user;
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Rider Info</h2>
      <h4>Area: {area}</h4>
      <h4>Vehicle Reg. Number: {vlnumber}</h4>
      <h4>Vehicle Brand: {brand}</h4>
      <h4>Vehicle Model: {model}</h4>
      <h4>
        Driving Licence:{" "}
        <Button>
          <a target="_blank" href={`http://localhost:5000/uploads/${drivingLicence}`}>View</a>
        </Button>
      </h4>
    </div>
  );
}
