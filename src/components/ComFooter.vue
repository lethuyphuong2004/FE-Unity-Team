<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <img src="@/assets/VN is awesome/VN.jpg" alt="Logo" class="logo" />
          <p>© 2025 Vietnam Is Awesome. All rights reserved.</p>
          <p>2nd Floor, 56 To Hien, Thanh My Loi Ward, Thu Duc, Ho Chi Minh City, Vietnam</p>
          <p>
            Call Us:
            <a href="tel:+84969384906">+84 96 938 4906</a>
          </p>
        </div>
        <div class="footer-col">
          <h4>Community</h4>
          <ul>
            <li><a href="#">Our Podcast</a></li>
            <li><a href="#">Join Our Newsletter</a></li>
            <li><a href="#">Become A Leader</a></li>
            <li><a href="#">Join Our Community</a></li>
            <li><a href="#">Our Leaders</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Press & Media</a></li>
            <li><a href="#">Partner With Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow Us</h4>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  background-color: #1a1a1a;
  padding: 70px 0;
  color: #ccc;
  font-family: sans-serif;
}

.logo {
  width: 180px;
  margin-bottom: 15px;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-col {
  width: 100%;
  text-align: left;
}

.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 20px;
  font-weight: 500;
  position: relative;
}

.footer-col h4:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  width: 50px;
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 8px;
}

.footer-col ul li a {
  color: #ccc;
  text-decoration: none;
}

.footer-col ul li a:hover {
  color: #fff;
}

.footer-col p,
.footer-col a {
  font-size: 14px;
  line-height: 1.6;
}

.social-icons {
  display: flex;
  gap: 10px;
  font-size: 20px;
}

.social-icons a {
  color: #ccc;
  text-decoration: none;
}

.social-icons a:hover {
  color: #fff;
}

@media(min-width: 769px) {
  .footer-col {
    width: 25%;
  }
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .footer-col {
    width: 100%;
    margin-bottom: 20px;
  }
}

</style>