window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1200);
});

// Ensure nav spacer matches navbar height to avoid overlap
function setNavSpacer() {
  const navbar = document.querySelector('.navbar');
  const spacer = document.querySelector('.nav-spacer');
  if (navbar && spacer) {
    const h = navbar.getBoundingClientRect().height;
    spacer.style.height = h + 'px';
  }
}

window.addEventListener('load', setNavSpacer);
window.addEventListener('resize', setNavSpacer);

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 80) {
    navbar.style.background = "rgba(7,18,37,0.9)";
  } else {
    navbar.style.background = "rgba(7,18,37,0.5)";
  }
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: contactForm.querySelector('input[placeholder="Your Name"]').value,
      email: contactForm.querySelector('input[placeholder="Your Email"]').value,
      phone: contactForm.querySelector('input[placeholder="Phone Number"]').value,
      service: contactForm.querySelectorAll("select")[0].value,
      budget: contactForm.querySelectorAll("select")[1].value,
      message: contactForm.querySelector("textarea").value,
    };

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Server connection error.");
      console.log(error);
    }
  });
}
function calculateEstimate() {
  const businessType = document.getElementById("businessType").value;
  const pages = Number(document.getElementById("pages").value);

  const seo = document.getElementById("seo").checked;
  const logo = document.getElementById("logo").checked;
  const shop = document.getElementById("shop").checked;
  const support = document.getElementById("support").checked;

  let minPrice = 250;
  let maxPrice = 500;
  let daysMin = 7;
  let daysMax = 14;
  let packageName = "Premium Website";

  if (businessType === "landing") {
    minPrice = 150;
    maxPrice = 300;
    packageName = "Landing Page";
  }

  if (businessType === "store") {
    minPrice = 600;
    maxPrice = 1200;
    daysMin = 14;
    daysMax = 30;
    packageName = "Online Store";
  }

  if (businessType === "booking") {
    minPrice = 500;
    maxPrice = 1000;
    daysMin = 12;
    daysMax = 25;
    packageName = "Booking Website";
  }

  minPrice += pages * 40;
  maxPrice += pages * 80;

  if (seo) {
    minPrice += 100;
    maxPrice += 250;
  }

  if (logo) {
    minPrice += 80;
    maxPrice += 200;
  }

  if (shop) {
    minPrice += 200;
    maxPrice += 500;
    daysMax += 7;
  }

  if (support) {
    maxPrice += 150;
  }

  document.getElementById("price").textContent = `€${minPrice} - €${maxPrice}`;
  document.getElementById("timeline").textContent = `Estimated timeline: ${daysMin}-${daysMax} days`;
  document.getElementById("package").textContent = `Recommended package: ${packageName}`;
}
function runAudit() {
  const url = document.getElementById("websiteUrl").value.trim();

  if (url === "") {
    alert("Please enter your website URL.");
    return;
  }

  const design = Math.floor(Math.random() * 21) + 65;
  const seo = Math.floor(Math.random() * 21) + 55;
  const mobile = Math.floor(Math.random() * 21) + 60;
  const speed = Math.floor(Math.random() * 21) + 58;

  const total = Math.round((design + seo + mobile + speed) / 4);

  document.getElementById("designScore").textContent = design;
  document.getElementById("seoScore").textContent = seo;
  document.getElementById("mobileScore").textContent = mobile;
  document.getElementById("speedScore").textContent = speed;
  document.getElementById("totalScore").textContent = total + "/100";

  let message = "";

  if (total >= 80) {
    message = "Your website has a strong foundation, but it can still be improved with better SEO, conversion strategy and premium design details.";
  } else if (total >= 65) {
    message = "Your website has potential, but it may need improvements in design, SEO structure, mobile optimization and loading speed.";
  } else {
    message = "Your website may be losing clients because of weak structure, poor SEO, slow speed or outdated design. A redesign could significantly improve results.";
  }

  document.getElementById("auditMessage").textContent = message;
}
const compareSlider = document.getElementById("compareSlider");
const beforeLayer = document.getElementById("beforeLayer");
const sliderLine = document.getElementById("sliderLine");

if (compareSlider && beforeLayer && sliderLine) {
  compareSlider.addEventListener("input", function () {
    const value = compareSlider.value;
    beforeLayer.style.width = value + "%";
    sliderLine.style.left = value + "%";
  });
}
function calculateROI() {
  const visitors = Number(document.getElementById("visitors").value);
  const clientValue = Number(document.getElementById("clientValue").value);
  const currentRate = Number(document.getElementById("currentRate").value);
  const improvedRate = Number(document.getElementById("improvedRate").value);

  if (!visitors || !clientValue || !currentRate || !improvedRate) {
    alert("Please complete all fields.");
    return;
  }

  const currentClients = visitors * (currentRate / 100);
  const improvedClients = visitors * (improvedRate / 100);
  const extraClients = improvedClients - currentClients;

  const monthlyExtraRevenue = extraClients * clientValue;
  const yearlyExtraRevenue = monthlyExtraRevenue * 12;

  document.getElementById("roiRevenue").textContent = `€${Math.round(yearlyExtraRevenue).toLocaleString()}/year`;
  document.getElementById("monthlyRevenue").textContent = `Additional monthly revenue: €${Math.round(monthlyExtraRevenue).toLocaleString()}`;
  document.getElementById("extraClients").textContent = `Extra clients per month: ${Math.round(extraClients)}`;

  document.getElementById("roiMessage").textContent =
    "A better website can turn the same traffic into more clients without increasing your advertising budget.";
}
function generateWebsitePlan() {
  const name = document.getElementById("plannerName").value.trim() || "Your Business";
  const type = document.getElementById("plannerType").value;
  const goal = document.getElementById("plannerGoal").value;
  const budget = document.getElementById("plannerBudget").value;

  let pages = ["Home", "About", "Services", "Reviews", "Contact"];
  let features = ["Responsive Design", "Contact Form", "SEO Structure", "Fast Loading Speed"];
  let packageName = "Business Website";

  if (type === "restaurant") {
    pages = ["Home", "Menu", "Gallery", "Reservations", "Reviews", "Contact"];
    features.push("Online Reservation", "Menu Section", "Location Map");
  }

  if (type === "beauty") {
    pages = ["Home", "Services", "Prices", "Portfolio", "Booking", "Reviews", "Contact"];
    features.push("Booking Form", "Gallery", "Instagram Integration");
  }

  if (type === "medical") {
    pages = ["Home", "Doctors", "Services", "Appointments", "FAQ", "Contact"];
    features.push("Appointment Form", "Trust Section", "FAQ");
  }

  if (type === "store") {
    pages = ["Home", "Shop", "Product Pages", "Cart", "Checkout", "Contact"];
    features.push("Online Payments", "Product Catalog", "Order Management");
    packageName = "Online Store";
  }

  if (type === "realestate") {
    pages = ["Home", "Properties", "Property Details", "About", "Contact"];
    features.push("Property Listings", "Lead Form", "Search Filters");
  }

  if (type === "construction") {
    pages = ["Home", "Projects", "Services", "Process", "Testimonials", "Contact"];
    features.push("Project Gallery", "Before / After Section", "Lead Form");
  }

  if (type === "personal") {
    pages = ["Home", "About", "Portfolio", "Media", "Contact"];
    features.push("Personal Branding", "Portfolio Showcase", "Social Links");
  }

  if (goal === "sell") {
    features.push("Sales-Focused Layout");
  }

  if (goal === "booking") {
    features.push("Booking Strategy");
  }

  if (goal === "premium") {
    features.push("Luxury Visual Identity");
  }

  let timeline = "7 - 14 days";

  if (budget === "premium") {
    timeline = "14 - 30 days";
    features.push("Advanced UI/UX", "SEO Optimization", "Analytics Setup");
  }

  document.getElementById("plannerTitle").textContent = `${name} Website Plan`;

  document.getElementById("plannerContent").innerHTML = `
    <div class="plan-card">
      <h3>Recommended Package</h3>
      <p>${packageName}</p>
    </div>

    <div class="plan-card">
      <h3>Suggested Pages</h3>
      <ul>${pages.map(page => `<li>${page}</li>`).join("")}</ul>
    </div>

    <div class="plan-card">
      <h3>Recommended Features</h3>
      <ul>${features.map(feature => `<li>${feature}</li>`).join("")}</ul>
    </div>

    <div class="plan-card">
      <h3>Estimated Timeline</h3>
      <p>${timeline}</p>
    </div>
  `;
}