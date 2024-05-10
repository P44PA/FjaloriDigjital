const handleClick = async () => {
    const inputValue = document.querySelector('.inputValue').value;
    if (!inputValue || inputValue.trim() === '') {
        alert("Please Enter any word to Search");
        return;
    }

    document.querySelector('.fa.fa-spinner.fa-spin').style.display = "block";
    document.querySelector('.search').style.display = 'none';

    try {
        // Fetch data from local JSON file
        const response = await fetch('data.json');
        const data = await response.json();

        // Assuming your JSON file contains an array of objects
        const result = data.filter(item => item.word === inputValue.toLowerCase())[0];

        if (!result) {
            throw new Error('Word not found');
        }

        document.querySelector('.section2').style.display = "block";
        document.querySelector('.value').innerText = inputValue;
        document.querySelector('.partOfSpeech').innerText = result.meanings[0].partOfSpeech;
        document.querySelector('.definition').innerText = result.meanings[0].definitions[0].definition;

        if (result.meanings[0].definitions[0].example) {
            document.querySelector('.exampleLabel').style.display = "block";
            document.querySelector('.example').style.display = "block";
            document.querySelector('.example').innerText = result.meanings[0].definitions[0].example;
        } else {
            document.querySelector('.exampleLabel').style.display = "none";
            document.querySelector('.example').style.display = "none";
        }
    } catch (error) {
        console.log(error);
        alert("Please Check Your Spelling! Try Again!");
        document.querySelector('.section2').style.display = "none";
    }

    document.querySelector('.fa.fa-spinner.fa-spin').style.display = "none";
    document.querySelector('.search').style.display = 'block';
}
