//message contient un string = suite de caractère
//salutation contient un tableau de string
// déclarer la liste des explosions (vide)
let nuclearExplosions = [];
let dataset;
let showAllExplosions = false; // Toggle switch to show all explosions
let yearSlider; // Slider to select year

//charger le fichier csv
// fonction preload sert uniquement à charger divers fichiers
// avant que le programme ne démarre, avant le setup et le draw
function preload() {
    // télécharger le fichier, les données
    // qui seront désormais stockées dans la variable dataset
    dataset = loadTable('nuclear_explosions.csv', 'csv', 'header', function() {
        for (let row of dataset.getRows()) {
            nuclearExplosions.push(new Explosions(row.get('Location.Country'), row.get('Location.Region'), row.get('Data.Source'), row.get('Location.Cordinates.Latitude'), row.get('Location.Cordinates.Longitude'), row.get('Data.Magnitude.Body'), row.get('Data.Magnitude.Surface'), row.get('Location.Cordinates.Depth'), row.get('Data.Yeild.Lower'), row.get('Data.Yeild.Upper'), row.get('Data.Purpose'), row.get('Data.Name'), row.get('Data.Type'), row.get('Date.Day'), row.get('Date.Month'), row.get('Date.Year')));
        }
    });
}

function windowResized() {
    //resize le canevas si la fenêtre est redimensionnée
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    // canevas responsive
    createCanvas(windowWidth, windowHeight);

    yearSlider = createSlider(1945, 2022, 1945);
    yearSlider.position(10, 10);
    showAllExplosionsToggle = createCheckbox('Show All Explosions', false);
    showAllExplosionsToggle.position(160, 10);
    showAllExplosionsToggle.changed(toggleExplosions);
    // Change la font et la taille du texte
    let textElement = select('body');
    textElement.style('font-size', '10px');
    textElement.style('font-family', 'Arial');
}

function toggleExplosions() {
    showAllExplosions = !showAllExplosions;
    if (showAllExplosions) {
        yearSlider.attribute('disabled', '');
    } else {
        yearSlider.removeAttribute('disabled');
    }
}

function draw() {
    background(255);
    let selectedYear = yearSlider.value();
    fill(0);
    textSize(10); // Agrandir la taille du texte à 20 pixels
    text("Year: " + selectedYear, 40, 50); 
    for (let explosion of nuclearExplosions) {
        let explosionYear = Number(explosion.Year);
        if (showAllExplosions || explosionYear === selectedYear) {
            explosion.display();
        }
    }
}

//déterminer la classe explosion qui permet d'individualiser les données des explosions
class Explosions {
    constructor(Country, Region, Source, Latitude, Longitude, Body, Surface, Depth, Lower, Upper, Purpose, Name, Type, Day, Month, Year) {
        this.Country = Country;
        this.Region = Region;
        this.Source = Source;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Body = Body;
        this.Surface = Surface;
        this.Depth = Depth;
        this.Lower = Lower;
        this.Upper = Upper;
        this.Purpose = Purpose;
        this.Name = Name;
        this.Type = Type;
        this.Day = Day;
        this.Month = Month;
        this.Year = Year;
    }

    display() {
        this.x = map(this.Longitude, -180, 180, 0, width);
        this.y = map(this.Latitude, -90, 90, height, 0);
        let size = Math.log(this.Upper) * 4;
        fill(255, 0, 0);
        ellipse(this.x, this.y, size, size);
        fill(0);
        textSize(5);
        textAlign(CENTER);
        text(this.Country, this.x, this.y);
    }
}