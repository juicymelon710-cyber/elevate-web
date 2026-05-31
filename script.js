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