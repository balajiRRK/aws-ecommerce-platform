import React from 'react';

const AboutUs = () => {
  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>About GameStart</h1>
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
                <img src="https://media.licdn.com/dms/image/v2/D5603AQHuw98fIzdQQQ/profile-displayphoto-scale_400_400/B56ZiZd782HMAg-/0/1754921419854?e=1762992000&v=beta&t=TKBPr915Z9kvRPOHepB8cZpaNzb66kjf29aLK-qzEok" alt="CEO" />
              </div>
              <div className="member-info">
                <h3>Casey Bartman</h3>
                <h4>Chief Technical Officer</h4>
                <p><strong>Education:</strong> B.S. Computer & Information Science with Honors, The Ohio State University (May 2026)</p>
                <p><strong>Experience:</strong><br />
                  <ul className="text-start">
                    <li>Software Development Engineer in Test Intern, CHAMP Titles (2025–Present): Lead a team of Senior Engineers through technical debt remediation, refactored legacy test architecture, improved CI/CD reliability.</li>
                    <li>Backend Software Developer Intern, CHAMP Titles (2024): Resolved critical production bugs, delivered backend features in Java Spring Boot/Docker.</li>
                    <li>Radiology Clinical Research Intern, University Hospitals (2023): Built Python GUI for CT scan analysis and visualization.</li>
                    <li>Biomedical Engineering Research Assistant, Case Western Reserve (2023): Segmented and cleaned cardiac CT images for deep learning.</li>
                    <li>Project Lead, Code 4 Community Club @ OSU: Led educational web app game for K-12, delivered workshops, mentored new devs.</li>
                  </ul>
                </p>
                <p><strong>Skills:</strong> JavaScript, Java, Ruby, C, SQL, HTML, CSS, Python, C#; Node.js, Cypress, Playwright, Spring Boot, Docker, Git, REST APIs, AWS, CI/CD, Agile.</p>
                <p><strong>Passions:</strong> Cooking, reading novels, playing the guitar, lifting, rooting for Michigan Football</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <img src="https://media.licdn.com/dms/image/v2/D5603AQGtOUWUhGl5aw/profile-displayphoto-scale_200_200/B56Znk8jZvI0AY-/0/1760482703508?e=1763596800&v=beta&t=6Cps04fgZ3GW9Myh9yz4yFnTeg0fmHSq0zGwLcsrHp0" alt="CEO Liad Naveh" />
              </div>
              <div className="member-info">
                <h3>Liad Naveh</h3>
                <h4>Chief Executive Officer</h4>
                <p><strong>Education:</strong> B.S. Computer Science & Engineering with Pre-Medical Track, The Ohio State University (May 2026) | Dean's List (2022-2025) | GPA: 3.95 | A.S. Liberal Arts & Sciences, Cuyahoga Community College | EMT-B Certified</p>
                <p><strong>Experience:</strong><br />
                  <ul className="text-start">
                    <li><strong>Research Pioneer:</strong> Leading cardiac electrophysiology research at Rush University Medical Center under Dr. Hagai Yavin, co-authoring breakthrough publications in Heart Rhythm Journal on radiofrequency ablation techniques that are revolutionizing cardiac care.</li>
                    <li><strong>Innovation Architect:</strong> Developed advanced image processing algorithms at University of Colorado using MATLAB and Python to extract heart rate data from RGB video analysis—creating next-generation data collection methodologies.</li>
                    <li><strong>Medical Technology Expert:</strong> As a Technician Assistant at Surgical Theater, installed cutting-edge medical devices in hospitals nationwide, collaborating with healthcare professionals and company executives to optimize surgical precision and patient outcomes.</li>
                    <li><strong>Emergency Medical Professional:</strong> Certified EMT-B with 200+ hours of intensive field experience across Cleveland Clinic Akron General, Akron Children's Hospital, and Stow Fire Department—mastering critical decision-making under pressure.</li>
                    <li><strong>Academic Excellence:</strong> Conducted over 150 personalized tutoring sessions in Physics, Chemistry, Organic Chemistry, and Mathematics, improving student performance by an average of 18%.</li>
                    <li><strong>Surgical Insight:</strong> Shadowed Dr. Maria Madden in advanced surgical procedures including breast cancer treatments, minimally invasive surgeries, and da Vinci Surgical System operations.</li>
                  </ul>
                </p>
                <p><strong>Technical Mastery:</strong> Full-stack development expertise in MATLAB, C/C++, Python, HTML, JavaScript; Advanced proficiency in SolidWorks, Arduino, circuit design; Database management with SQL; Cloud technologies and system architecture.</p>
                <p><strong>Leadership & Community:</strong> Active member of Students Supporting Israel (SSI), Jewish Runners Club, Soccer Indoor Club, and former Buckeye Solar Racing Club engineer. Youngest server at Cleveland's highest-grossing Italian restaurant, consistently generating $2,000+ in nightly sales.</p>
                <p><strong>Vision:</strong> Combining cutting-edge technology expertise with deep medical knowledge to create the most innovative, user-centric gaming marketplace in the world. Leveraging emergency medical training to build systems that perform flawlessly under pressure, and research experience to drive data-driven decision making that keeps GameStart at the forefront of the digital gaming revolution.</p>
                <p><strong>Languages:</strong> Bilingual- Fluent in English and Hebrew</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <img src="https://media.licdn.com/dms/image/v2/D5603AQFU_LW7XeDScg/profile-displayphoto-shrink_400_400/B56ZVS8_qGGQAk-/0/1740853476431?e=1762387200&v=beta&t=rg6xre0K59Y2Tz-yAH9iVil7ouiWUMJGf2j6xQWY118" alt="CMO" />
              </div>
              <div className="member-info">
                <h3>Balaji Radhakrishnan</h3>
                <h4>Chief Marketing Officer</h4>
                <p><strong>Education:</strong> B.S. Computer Science & Engineering, The Ohio State University (December 2025) | Dean's List (2022-2025) | GPA: 3.83 </p>
                <p><strong>Experience:</strong><br />
                  <ul className="text-start">
                    <li><strong>Student Data Librarian:</strong> Automated documentation workflows through developing Python scripts to replace manual Excel updates, improving efficiency and accuracy.</li>
                    <li><strong>Autonomous Driving Researcher:</strong> Enhanced object visualization capabilities by implementing additional identification metrics and indicators for different object types, improving object detection clarity and analytical insights.</li>
                  </ul>
                </p>
                <p><strong>Skills:</strong> Java, Python, C, C++, JavaScript/TypeScript, HTML, CSS, Ruby, Ruby on Rails, x86 Assembly, SQL, Excel, R, MATLAB, Bash, Scheme48 </p>
                <p><strong>Technical Interests:</strong> Machine Learning, Software Engineering, Data Analysis </p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQElt8sE4Hy5pQ/profile-displayphoto-scale_200_200/B4DZmPHgq0GwAY-/0/1759042735627?e=2147483647&v=beta&t=muPcTL-kolkAgRc2ZYdXnDgO0hqgnoywSXadJ5CiNt4" alt="CFO" />
              </div>
              <div className="member-info">
                <h3>Kaivalya Pitale</h3>
                <h4>Chief Financial Officer</h4>
                <p><strong>Education:</strong>  M.S. Computer Science & Engineering, The Ohio State University (May 2026) | B.E. Computer Science & Engineering, Pune Institute of Computer Technology (May 2023)</p>
<p><strong>Experience:</strong><br />
  <ul className="text-start">
    <li><strong>Business Analyst & Manager:</strong> Bridged communication between IT and business stakeholders at HDFC Bank. Worked in API testing, database management, project portfolio management, and business rule engines while leveraging Atlassian tools like Jira, Confluence, and Zephyr. Also automated synthetic data preparation for improved testing efficiency.</li>
    
    <li><strong>AI & Python Developer:</strong> At Mass Technologies, developed machine learning and computer vision solutions including disease detection in seeds using OpenCV and object size estimation. Also contributed to backend automation, Python scripting, and data-driven analysis for internal tools.</li>
    
    <li><strong>Machine Learning Intern:</strong> At GirlScript Technologies, gained hands-on experience with AI, machine learning, and chatbot development while working on practical learning objectives.</li>
    
    <li><strong>Machine Learning Head:</strong> As Overall ML Head at PICT CSI Student Branch, led a technical team in developing in-house AI applications, conducted workshops on ML fundamentals, and managed large-scale technical events including XENIA, the annual tech fest.</li>
  </ul>
</p>

                <p><strong>Technical Skills:</strong><br />
  <ul className="text-start">
    <li><strong>Programming Languages:</strong> C, C++, Java, Python (AI, ML, and Data Science).</li>
    <li><strong>Web Development:</strong> HTML, CSS, JavaScript, and MERN Stack (MongoDB, Express, React, Node.js).</li>
    <li><strong>Mobile Development:</strong> Proficient in Android app development using Kotlin.</li>
    <li><strong>Database Management:</strong> Experienced with SQL and data-driven applications.</li>
  </ul>
</p>

              </div>
            </div>
          </div>
        </div>

        <div className="investors-section">
          <h2>Investment Opportunity</h2>
          <p>
            GameStart represents a unique opportunity to invest in the rapidly growing digital gaming market. 
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