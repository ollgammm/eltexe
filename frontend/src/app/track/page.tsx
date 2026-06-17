export default function Tes() {
  const age = 19;

  function getYear() {
    if (age < 15) {
      console.log(`В наше заведение нельзя людям с возрастом ${age}`);
    } else {
      console.log('Проходите');
    }
  }
  return <div className=""></div>;
}
