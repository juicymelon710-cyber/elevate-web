window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1200);
});

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