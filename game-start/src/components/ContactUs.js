import React from 'react';

const ContactUs = () => {
  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>Contact Us</h1>
        <p>We're Here to Help - Your Gaming Experience is Our Priority</p>
      </div>

      <div className="container my-5">
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="text-center mb-4">Get In Touch</h2>
          </div>
        </div>
        <div className="row mb-5">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">📞 Customer Support</h5>
                  <div className="contact-details">
                    <p><strong>Phone:</strong> 1-800-GAMESTART (1-800-426-3482)</p>
                    <p><strong>Email:</strong> support@gamestart.com</p>
                    <p><strong>Hours:</strong> 24/7 Support Available</p>
                    <p><strong>Response Time:</strong> Within 2 hours</p>
                  </div>
                </div>
            </div>
          </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">🔧 Technical Support</h5>
                  <div className="contact-details">
                    <p><strong>Phone:</strong> 1-800-TECH-HUB (1-800-832-4482)</p>
                    <p><strong>Email:</strong> tech@gamestart.com</p>
                    <p><strong>Hours:</strong> Mon-Fri 8AM-8PM EST</p>
                    <p><strong>Live Chat:</strong> Available on website</p>
                  </div>
                </div>
            </div>
          </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">💳 Billing & Refunds</h5>
                  <div className="contact-details">
                    <p><strong>Phone:</strong> 1-800-BILLING (1-800-245-5464)</p>
                    <p><strong>Email:</strong> billing@gamestart.com</p>
                    <p><strong>Hours:</strong> Mon-Fri 9AM-6PM EST</p>
                    <p><strong>Account Portal:</strong> <a href="#account">My Account</a></p>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="support-policies">
          <h2>Support & Return Policies</h2>
          
          <div className="policy-section">
            <h3>Return Policy</h3>
            <ul>
              <li><strong>Digital Games:</strong> 14-day return window from purchase date</li>
              <li><strong>Pre-orders:</strong> Full refund available until release date</li>
              <li><strong>DLC & Add-ons:</strong> 7-day return window if not downloaded</li>
              <li><strong>Gift Cards:</strong> Non-refundable (unless required by law)</li>
              <li><strong>Condition:</strong> Game must not be played for more than 2 hours</li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>Warranty & Guarantee</h3>
            <ul>
              <li>All digital products guaranteed to work on supported platforms</li>
              <li>Free re-download if files become corrupted</li>
              <li>Technical support for installation and compatibility issues</li>
              <li>30-day money-back guarantee for technical issues we cannot resolve</li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>Support Response Times</h3>
            <ul>
              <li><strong>Critical Issues:</strong> Within 1 hour</li>
              <li><strong>Billing Problems:</strong> Within 2 hours</li>
              <li><strong>Technical Support:</strong> Within 4 hours</li>
              <li><strong>General Inquiries:</strong> Within 24 hours</li>
            </ul>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3>How do I download my games?</h3>
            <p>After purchase, go to your account library. Click "Download" next to your game. You'll receive download links and product keys if applicable.</p>
          </div>

          <div className="faq-item">
            <h3>Can I play my games on multiple devices?</h3>
            <p>Yes! Most games can be installed on multiple devices you own. Check the specific game's licensing terms for any restrictions.</p>
          </div>

          <div className="faq-item">
            <h3>What if I lose my product key?</h3>
            <p>No worries! All your keys are stored in your account library. You can access them anytime by logging into your GameStart account.</p>
          </div>

          <div className="faq-item">
            <h3>How do I request a refund?</h3>
            <p>Go to your account, find the game in your library, and click "Request Refund." Eligible refunds are processed within 3-5 business days.</p>
          </div>

          <div className="faq-item">
            <h3>Do you offer student discounts?</h3>
            <p>Yes! Verify your student status through our education portal for 10% off all purchases. Military discounts are also available.</p>
          </div>

          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cryptocurrencies (Bitcoin, Ethereum).</p>
          </div>

          <div className="faq-item">
            <h3>Is my personal information secure?</h3>
            <p>Absolutely. We use bank-level encryption and never store your payment information. All transactions are processed through secure, PCI-compliant systems.</p>
          </div>

          <div className="faq-item">
            <h3>Can I gift games to friends?</h3>
            <p>Yes! You can purchase games as gifts and send them directly to friends via email. Gift recipients can choose when to redeem their games.</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" required />
                      </div>
                    </div>
                  
                    <div className="mb-3">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <select className="form-select" id="subject" name="subject" required>
                        <option value="">Select a topic</option>
                        <option value="billing">Billing & Refunds</option>
                        <option value="technical">Technical Support</option>
                        <option value="general">General Inquiry</option>
                        <option value="bug">Bug Report</option>
                        <option value="feedback">Feedback & Suggestions</option>
                      </select>
                    </div>
                  
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea className="form-control" id="message" name="message" rows="5" required placeholder="Please describe your issue or question in detail..."></textarea>
                    </div>
                  
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-lg px-5">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>

        <div className="additional-resources">
          <h2>Additional Resources</h2>
          <div className="resource-links">
            <a href="#help-center" className="resource-link">
              <h3>📚 Help Center</h3>
              <p>Browse our comprehensive knowledge base</p>
            </a>
            <a href="#community" className="resource-link">
              <h3>💬 Community Forums</h3>
              <p>Connect with other gamers and get peer support</p>
            </a>
            <a href="#system-status" className="resource-link">
              <h3>🟢 System Status</h3>
              <p>Check current system status and scheduled maintenance</p>
            </a>
            <a href="#developer-support" className="resource-link">
              <h3>👨‍💻 Developer Support</h3>
              <p>Resources for game developers and publishers</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;