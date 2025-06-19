document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  const employeeList = document.getElementById("employeeList");
  const employeeStats = document.getElementById("employeeStats");
  const getStartedBtn = document.getElementById("getStartedBtn");
  const employeesSection = document.getElementById("employeesSection");
  const emptyState = document.getElementById("emptyState");

  const startButton = document.getElementById("getStartedBtn");
  const formSection = document.querySelector(".form-section");
  
    if (startButton && formSection) {
      startButton.addEventListener("click", () => {
        formSection.scrollIntoView({
          behavior: "smooth",  
          block: "start"    
        });
      });
    } else {
      console.error("Élément manquant: Assurez-vous que l'ID et la classe sont corrects.");
    }  

  let employees = JSON.parse(localStorage.getItem("orangeEmployees") || "[]");


  function renderEmployees() {
      employeeList.innerHTML = ""; 
      if (employees.length === 0) {

          const emptyDiv = document.createElement('div');
          emptyDiv.className = 'empty-state';
          emptyDiv.innerHTML = `
              <div class="empty-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <line x1="19" y1="8" x2="19" y2="14"/>
                      <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
              </div>
              <h3>Aucun employé ajouté pour le moment.</h3>
              <p>Utilisez le formulaire ci-dessus pour ajouter des employés.</p>
          `;
          employeeList.appendChild(emptyDiv);
          employeeStats.querySelector(".employee-count").textContent = "0 employé(s)";
      }else {

        emptyState.style.display = "none";
      
        employees.forEach((emp, index) => {
            const card = document.createElement("div");
            card.className = "employee-card";
            card.innerHTML = `
                <div class="employee-info">
                    <h3>${emp.prenom} ${emp.nom}</h3>
                    <p><strong>Email:</strong> ${emp.email}</p>
                    <p><strong>Poste:</strong> ${emp.poste}</p>
                </div>
                <button class="delete-btn" data-index="${index}">Supprimer</button>
            `;
            employeeList.appendChild(card);
        });
      

        employeeStats.querySelector(".employee-count").textContent = `${employees.length} employé(s)`;
     }
      
  }

  form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nom = document.getElementById("nom").value.trim();
      const prenom = document.getElementById("prenom").value.trim();
      const email = document.getElementById("email").value.trim();
      const poste = document.getElementById("poste").value.trim();

      if (!nom || !prenom || !email || !poste) return alert("Tous les champs sont requis.");
      if (employees.some(e => e.email.toLowerCase() === email.toLowerCase())) return alert("Email déjà utilisé.");


      employees.push({ nom, prenom, email, poste });
      localStorage.setItem("orangeEmployees", JSON.stringify(employees));

      form.reset();
      renderEmployees(); 
  });

  employeeList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
          const index = e.target.getAttribute("data-index");
          employees.splice(index, 1); 
          localStorage.setItem("orangeEmployees", JSON.stringify(employees));
          renderEmployees(); 
      }
  });

  getStartedBtn.addEventListener("click", () => {
      employeesSection.style.display = "block";
      renderEmployees(); 
  });

  renderEmployees();
});
