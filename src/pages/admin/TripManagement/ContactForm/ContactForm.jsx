import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    destination: '',
    city: '',
    departureType: 'fixed',
    startDate: '',
    endDate: '',
    adults: '0',
    children: '0',
    infants: '0',
    fullName: '',
    email: '',
    phone: '',
    whatsapp: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/; // Supports international numbers

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleDepartureType = (type) => {
    setFormData({
      ...formData,
      departureType: type,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Destination validation
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Date validation
    if (formData.departureType === 'fixed') {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (!formData.endDate) {
        newErrors.endDate = 'End date is required';
      }
      if (
        formData.startDate &&
        formData.endDate &&
        new Date(formData.startDate) > new Date(formData.endDate)
      ) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    // People validation - at least one person
    if (
      formData.adults === '0' &&
      formData.children === '0' &&
      formData.infants === '0'
    ) {
      newErrors.adults = 'At least one traveler is required';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      // You would typically send the data to your backend here
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light py-4">
      <div className="row shadow rounded overflow-hidden w-100 mx-3" style={{ maxWidth: '1000px' }}>
        <div className="col-12 d-md-none text-center py-3" style={{
          background: 'linear-gradient(180deg, #EB662B 0%, #f28d5c 100%)',
        }}>
          <h3 className="fw-bold mb-0 text-white">TravelPro</h3>
        </div>
        
        {/* Left Panel */}
        <div
          className="col-md-5 p-4 text-white d-none d-md-block"
          style={{
            background: 'linear-gradient(180deg, #EB662B 0%, #f28d5c 100%)',
          }}
        >
          <h3 className="fw-bold mb-4">TravelPro</h3>
          <p className="mb-4">Your Journey Starts Here</p>

          <h5 className="fw-semibold mb-3">How It Works</h5>
          <ul className="list-unstyled mb-5">
            <li className="mb-3">
              <span className="me-2">📍</span>
              Select Your Tour
            </li>
            <li className="mb-3">
              <span className="me-2">📋</span>
              Get Multiple Free Quotes
            </li>
            <li className="mb-3">
              <span className="me-2">✅</span>
              Customize &amp; Book
            </li>
          </ul>

          <div className="bg-white bg-opacity-10 rounded p-3 mb-4">
            <p className="mb-1">
              1500+ <small>Verified Agents</small>
            </p>
            <p className="mb-1">
              100k+ <small>Happy Travellers</small>
            </p>
            <p className="mb-0">
              190+ <small>Destinations</small>
            </p>
          </div>

          <div className="bg-white bg-opacity-10 rounded p-3">
            <span className="me-2">📞</span>
            Need Help? Call Us
            <br />
            <span className="fw-bold">+1 (555) 123-4567</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-7 bg-white p-4">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div
                className="text-success mb-3"
                style={{ fontSize: '3rem' }}
              >✅</div>
              <h4 className="fw-bold mt-3">Thank You!</h4>
              <p className="text-muted">
                We've received your information and will contact you shortly to
                plan your dream holiday.
              </p>
            </div>
          ) : (
            <>
              <h4 className="fw-bold mb-1">Where do you want to go?</h4>
              <p className="text-muted mb-4">
                Tell us about your dream destination
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.destination ? 'is-invalid' : ''
                    }`}
                    placeholder="Search Destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                  {errors.destination && (
                    <div className="invalid-feedback">{errors.destination}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.city ? 'is-invalid' : ''
                    }`}
                    placeholder="Search City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>

                {/* Departure toggle */}
                <div className="d-flex gap-2 mb-3">
                  <button
                    type="button"
                    className={`btn w-50 fw-bold ${
                      formData.departureType === 'fixed'
                        ? 'text-white'
                        : 'text-dark'
                    }`}
                    style={{
                      backgroundColor:
                        formData.departureType === 'fixed'
                          ? '#EB662B'
                          : 'transparent',
                      border:
                        formData.departureType === 'fixed'
                          ? '1px solid #EB662B'
                          : '1px solid #ced4da',
                    }}
                    onClick={() => handleDepartureType('fixed')}
                  >
                    Fixed
                  </button>
                  <button
                    type="button"
                    className={`btn w-50 fw-bold ${
                      formData.departureType === 'flexible' ? 'text-white' : ''
                    }`}
                    style={{
                      backgroundColor:
                        formData.departureType === 'flexible'
                          ? '#EB662B'
                          : 'transparent',
                      border:
                        formData.departureType === 'flexible'
                          ? '1px solid #EB662B'
                          : '1px solid #ced4da',
                      color:
                        formData.departureType === 'flexible'
                          ? 'white'
                          : '#EB662B',
                    }}
                    onClick={() => handleDepartureType('flexible')}
                  >
                    Flexible
                  </button>
                </div>

                {formData.departureType === 'fixed' && (
                  <div className="row g-2 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Start Date</label>
                      <input
                        type="date"
                        className={`form-control ${
                          errors.startDate ? 'is-invalid' : ''
                        }`}
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                      {errors.startDate && (
                        <div className="invalid-feedback">
                          {errors.startDate}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">End Date</label>
                      <input
                        type="date"
                        className={`form-control ${
                          errors.endDate ? 'is-invalid' : ''
                        }`}
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                      {errors.endDate && (
                        <div className="invalid-feedback">{errors.endDate}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Adults / Children / Infants */}
                <div className="row g-2 mb-3">
                  <div className="col-4">
                    <label className="form-label small text-muted">Adults</label>
                    <select
                      className={`form-select ${
                        errors.adults ? 'is-invalid' : ''
                      }`}
                      name="adults"
                      value={formData.adults}
                      onChange={handleChange}
                    >
                      <option value="0">0</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i+1}>
                          {i+1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="form-label small text-muted">Children</label>
                    <select
                      className="form-select"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                    >
                      <option value="0">0</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i+1}>
                          {i+1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4">
                    <label className="form-label small text-muted">Infants</label>
                    <select
                      className="form-select"
                      name="infants"
                      value={formData.infants}
                      onChange={handleChange}
                    >
                      <option value="0">0</option>
                      {[...Array(5)].map((_, i) => (
                        <option key={i} value={i+1}>
                          {i+1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.adults && (
                  <div className="text-danger small mb-3">{errors.adults}</div>
                )}

                <div className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.fullName ? 'is-invalid' : ''
                    }`}
                    placeholder="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.phone ? 'is-invalid' : ''
                    }`}
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="whatsapp"
                    name="whatsapp"
                    checked={formData.whatsapp}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="whatsapp">
                    I agree to Terms &amp; Get updates on WhatsApp
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-bold text-white py-2"
                  style={{ backgroundColor: '#EB662B' }}
                >
                  Plan My Holidays
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}