const form = document.querySelector('form');
const commentList = document.getElementById('commentList');
const viewAllBtn = document.getElementById('viewAllBtn');

let comments = [];
let showingAll = false;


window.addEventListener('load', () => {
  const stored = localStorage.getItem('comments');
  if (stored) {
    comments = JSON.parse(stored);
  }
  renderComments();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const comment = document.getElementById('com').value.trim();
  const country = document.getElementById('country').value;

  if (fname && lname && comment) {
    const timestamp = new Date().toLocaleString();

    const commentObj = {
      name: `${fname} ${lname}`,
      country: country,
      text: comment,
      time: timestamp
    };

    comments.unshift(commentObj); 
    localStorage.setItem('comments', JSON.stringify(comments));
    form.reset();
    renderComments();
  }
});

function renderComments() {
  commentList.innerHTML = '';

  const visible = showingAll ? comments : comments.slice(0, 5);

  visible.forEach((comment) => {
    const div = document.createElement('div');
    div.className = 'comment-box';
    div.innerHTML = `
  <strong>${comment.name}</strong> <em>(${comment.country})</em><br>
  <small>${comment.time}</small>
  <p>${comment.text}</p>
`;
    commentList.appendChild(div);
  });

  if (comments.length > 5) {
    viewAllBtn.style.display = 'block';
    viewAllBtn.textContent = showingAll ? 'Show Less' : 'View All Comments';
  } else {
    viewAllBtn.style.display = 'none';
  }
}

viewAllBtn.addEventListener('click', () => {
  showingAll = !showingAll;
  renderComments();
});

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
  "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const countrySelect = document.getElementById("country");

countries.forEach(country => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});


const postsContainer = document.getElementById('postsContainer');

fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')  
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post-box';
      postDiv.style.marginBottom = '20px';
      postDiv.style.padding = '10px';
      postDiv.style.border = '1px solid #ccc';
      postDiv.style.borderRadius = '5px';
      postDiv.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => {
    postsContainer.innerHTML = `<p style="color:red;">Failed to load blog posts.</p>`;
    console.error('Error fetching posts:', error);
  });
