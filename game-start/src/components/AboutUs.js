import React from 'react';

const AboutUs = () => {
  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>About GameHub</h1>
        <p>Your Premier Destination for Digital Gaming Excellence</p>
      </div>

      <div className="container my-5">
        <div className="row mb-5">
          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title text-primary">Our Mission</h2>
                <p className="card-text">
                  To provide gamers worldwide with the most comprehensive, affordable, and 
                  accessible digital gaming experience. We believe every gamer deserves access 
                  to the latest and greatest games at competitive prices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title text-primary">Our Vision</h2>
                <p className="card-text">
                  To be the world's leading digital gaming marketplace, fostering a global 
                  community where gamers discover, purchase, and enjoy their favorite games 
                  with seamless convenience and unmatched customer service.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="strategy-section">
            <h2 className="text-center mb-4">Company Strategy</h2>
            <div className="row mb-5">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">🎮 Comprehensive Game Library</h5>
                    <p className="card-text">Partner with major and indie game developers to offer the largest selection of games across all genres and platforms.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">💰 Competitive Pricing</h5>
                    <p className="card-text">Leverage bulk purchasing and strategic partnerships to offer the best prices and frequent promotional deals.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">🚀 Innovation & Technology</h5>
                    <p className="card-text">Continuously invest in cutting-edge technology to provide seamless user experience and instant game delivery.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">🤝 Community Focus</h5>
                    <p className="card-text">Build strong relationships with our gaming community through excellent customer service and engagement.</p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Meet Our Executives</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                    Place photos here!
                <img src="https://via.placeholder.com/200x200/4a90e2/ffffff?text=CEO" alt="CEO" />
              </div>
              <div className="member-info">
                <h3>Name</h3>
                <h4>Chief Executive Officer</h4>
                <p><strong>Education:</strong> MBA from Stanford University, BS Computer Science from MIT</p>
                <p><strong>Experience:</strong> 15+ years in tech leadership, former VP at Electronic Arts, led 3 successful gaming startups</p>
                <p><strong>Passion:</strong> Revolutionizing the gaming industry through innovative digital distribution and creating inclusive gaming communities worldwide</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <img src="https://via.placeholder.com/200x200/e74c3c/ffffff?text=CTO" alt="CTO" />
              </div>
              <div className="member-info">
                <h3>Name</h3>
                <h4>Chief Technology Officer</h4>
                <p><strong>Education:</strong> MS Computer Science from Carnegie Mellon, BS Software Engineering from UC Berkeley</p>
                <p><strong>Experience:</strong> 12+ years building scalable platforms, former Senior Engineer at Steam, cloud architecture expert</p>
                <p><strong>Passion:</strong> Building lightning-fast, reliable gaming platforms that can handle millions of users while maintaining exceptional performance</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <img src="https://via.placeholder.com/200x200/2ecc71/ffffff?text=CMO" alt="CMO" />
              </div>
              <div className="member-info">
                <h3>Name</h3>
                <h4>Chief Marketing Officer</h4>
                <p><strong>Education:</strong> MBA Marketing from Wharton, BA Communications from Northwestern</p>
                <p><strong>Experience:</strong> 10+ years in gaming marketing, former Marketing Director at Ubisoft, social media strategy expert</p>
                <p><strong>Passion:</strong> Connecting gamers with their perfect games through data-driven marketing and authentic community engagement</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <img src="https://via.placeholder.com/200x200/9b59b6/ffffff?text=CFO" alt="CFO" />
              </div>
              <div className="member-info">
                <h3>Name</h3>
                <h4>Chief Financial Officer</h4>
                <p><strong>Education:</strong> MBA Finance from Harvard, CPA, BS Accounting from NYU</p>
                <p><strong>Experience:</strong> 14+ years in tech finance, former Finance Director at Activision Blizzard, M&A specialist</p>
                <p><strong>Passion:</strong> Optimizing financial strategies to fuel growth while maintaining sustainable business practices in the dynamic gaming market</p>
              </div>
            </div>
          </div>
        </div>

        <div className="investors-section">
          <h2>Investment Opportunity</h2>
          <p>
            GameHub represents a unique opportunity to invest in the rapidly growing digital gaming market. 
            With our experienced leadership team, proven technology platform, and strategic market position, 
            we are poised for significant growth and market expansion.
          </p>
          <div className="investment-highlights">
            <div className="highlight">
              <h4>Market Leadership</h4>
              <p>Positioned in the $180B+ global gaming market with strong growth trajectory</p>
            </div>
            <div className="highlight">
              <h4>Proven Team</h4>
              <p>Leadership with combined 50+ years of gaming industry experience and successful track records</p>
            </div>
            <div className="highlight">
              <h4>Scalable Technology</h4>
              <p>Cloud-native platform built to handle exponential growth and global expansion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;