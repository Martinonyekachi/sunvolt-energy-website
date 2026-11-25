import { useEffect, useState } from 'react'
import './App.css'

const iconPaths = {
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  battery: ['M9 7V4h6v3', 'M4 7h16v13H4z', 'M22 11v5'],
  bolt: ['m13 2-3 8h7l-6 12 1-9H5l8-11z'],
  building: ['M3 21h18', 'M5 21V7l8-4v18', 'M19 21V11l-6-4', 'M9 9v.01', 'M9 12v.01', 'M9 15v.01', 'M9 18v.01'],
  check: ['m5 12 4 4L19 6'],
  chevron: ['m9 18 6-6-6-6'],
  close: ['M18 6 6 18', 'm6 6 12 12'],
  home: ['m3 10 9-7 9 7', 'M5 9v12h14V9', 'M9 21v-8h6v8'],
  instagram: ['M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M17.5 6.5h.01'],
  leaf: ['M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16z', 'M5 20c3-5 7-8 12-10'],
  mail: ['M4 5h16v14H4z', 'm4 7 8 6 8-6'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  phone: ['M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.1 10a16 16 0 0 0 6 6l1.6-1.9a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.6 1.9z'],
  pin: ['M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z', 'M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  shield: ['M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z', 'm9 12 2 2 4-4'],
  spark: ['m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z', 'm19 14 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z'],
  sun: ['M12 3v2', 'M12 19v2', 'm4.2 4.2 1.4 1.4', 'm18.4 18.4 1.4 1.4', 'M3 12h2', 'M19 12h2', 'm4.2 19.8 1.4-1.4', 'm18.4 5.6 1.4-1.4', 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'],
  wrench: ['M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7z'],
}

const phonePattern = String.raw`\+?[0-9](?:[0-9\s\x2d]|\(|\)){5,}[0-9]`

function getUnsplashImage(image, width, quality = 80) {
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=${quality}`
}

function getUnsplashSrcSet(image, widths, quality = 80) {
  return widths.map((width) => `${getUnsplashImage(image, width, quality)} ${width}w`).join(', ')
}

function Icon({ name, size = 22, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width={size}
    >
      {(iconPaths[name] || []).map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  )
}

const navLinks = [
  ['About', '#about'],
  ['Solutions', '#services'],
  ['Products', '#products'],
  ['Our work', '#projects'],
  ['Contact', '#contact'],
]

const stats = [
  { value: '500+', label: 'installations completed' },
  { value: '1,200+', label: 'happy customers' },
  { value: '10+', label: 'years of experience' },
  { value: '95%', label: 'customer satisfaction' },
]

const services = [
  { icon: 'home', title: 'Residential solar', text: 'Thoughtfully designed systems that make dependable energy part of everyday life.' },
  { icon: 'building', title: 'Commercial solutions', text: 'Scalable solar installations built around the unique needs of your business.' },
  { icon: 'bolt', title: 'Inverter installation', text: 'Efficient inverter systems, professionally specified and set up for your space.' },
  { icon: 'battery', title: 'Battery storage', text: 'Store clean energy for later and enjoy more control when the grid goes quiet.' },
  { icon: 'wrench', title: 'Care & maintenance', text: 'Ongoing inspections and practical support to keep your system performing.' },
  { icon: 'spark', title: 'Energy consultation', text: 'Clear, expert guidance to help you find the right path to energy independence.' },
]

const products = [
  {
    name: 'Monocrystalline panels',
    detail: 'Efficient rooftop modules selected for long-term performance.',
    image: 'photo-1509391366360-2e959784a276',
    alt: 'Rows of dark solar panels angled toward the sun',
    tag: '01 / SOLAR',
  },
  {
    name: 'Hybrid inverters',
    detail: 'One intelligent system for solar, battery and grid power.',
    image: 'photo-1497435334941-8c899ee9e8e9',
    alt: 'A solar installation supplying clean electricity',
    tag: '02 / INVERTERS',
  },
  {
    name: 'Lithium storage',
    detail: 'Quiet, compact storage that keeps essential circuits online.',
    image: 'photo-1508514177221-188b1cf16e9d',
    alt: 'A ground-mounted solar array in open countryside',
    tag: '03 / STORAGE',
  },
  {
    name: 'Charge controllers',
    detail: 'Careful charge management for safer, more efficient storage.',
    image: 'photo-1497440001374-f26997328c1b',
    alt: 'Solar modules installed across a rooftop',
    tag: '04 / CONTROL',
  },
]

const benefits = [
  ['shield', 'Experienced professionals', 'Skilled people who take the time to understand your needs.'],
  ['check', 'Quality equipment', 'Carefully selected components built for long-term performance.'],
  ['bolt', 'Solutions that make sense', 'Straightforward recommendations with no one-size-fits-all plans.'],
  ['phone', 'Here when you need us', 'A friendly team ready with reliable after-installation support.'],
  ['leaf', 'A lighter footprint', 'A meaningful step toward cleaner, more sustainable energy.'],
  ['wrench', 'Installation done right', 'Careful workmanship from first site visit to final handover.'],
]

const projects = [
  { type: 'RESIDENTIAL · LAGOS', category: 'Residential', title: 'A more resilient family home', system: '8.2 kWp solar · 10 kWh storage', image: 'photo-1497440001374-f26997328c1b', alt: 'Rooftop solar modules on a residential property', className: 'project-tall' },
  { type: 'COMMERCIAL · ABUJA', category: 'Commercial', title: 'A cooler, quieter workday', system: '24 kWp rooftop solar · hybrid system', image: 'photo-1497435334941-8c899ee9e8e9', alt: 'Solar panels generating power for a commercial building', className: '' },
  { type: 'INDUSTRIAL · OGUN', category: 'Commercial', title: 'More control on the factory floor', system: 'Hybrid power · critical-load backup', image: 'photo-1509391366360-2e959784a276', alt: 'A large solar panel array in afternoon light', className: '' },
  { type: 'OFF-GRID · OYO', category: 'Off-grid', title: 'Reliable power beyond the grid', system: 'Solar + battery · independent system', image: 'photo-1508514177221-188b1cf16e9d', alt: 'A solar installation in an open rural landscape', className: 'project-wide' },
]

const projectFilters = ['All projects', 'Residential', 'Commercial', 'Off-grid']

const testimonials = [
  {
    quote: 'From the first conversation to the final installation, the team made everything feel simple. Our home feels more comfortable knowing we have dependable power.',
    name: 'Amara Okafor',
    detail: 'Homeowner · Lagos',
  },
  {
    quote: 'They listened to what our business actually needed and designed a system that works around our day. Thoughtful, professional, and easy to recommend.',
    name: 'Tunde Adeyemi',
    detail: 'Business owner · Abuja',
  },
  {
    quote: 'Clear communication, careful installation, and genuine support afterwards. It was a refreshingly straightforward experience from beginning to end.',
    name: 'Nneka Eze',
    detail: 'Homeowner · Ibadan',
  },
]

function Brand({ light = false }) {
  return (
    <a aria-label="Sunvolt Energy, home" className={`brand${light ? ' brand-light' : ''}`} href="#home">
      <span className="brand-mark"><Icon name="sun" size={24} /></span>
      <span className="brand-name">SUNVOLT<span>ENERGY</span></span>
    </a>
  )
}

function ButtonLink({ children, href, variant = 'primary', className = '' }) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      {children}
      <Icon name="arrow" size={17} />
    </a>
  )
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading reveal${light ? ' heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="nav-shell container">
        <Brand />
        <button
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
        </button>
        <div className={`nav-content${menuOpen ? ' nav-open' : ''}`} id="site-navigation">
          <div className="nav-links">
            {navLinks.map(([label, href]) => (
              <a href={href} key={href} onClick={closeMenu}>{label}</a>
            ))}
          </div>
          <ButtonLink className="nav-cta" href="#contact">Get a quote</ButtonLink>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <img
        alt="Solar panels stretching across a sunlit landscape"
        className="hero-image"
        fetchPriority="high"
        sizes="100vw"
        src={getUnsplashImage('photo-1509391366360-2e959784a276', 2200, 85)}
        srcSet={getUnsplashSrcSet('photo-1509391366360-2e959784a276', [480, 900, 1440, 2200], 85)}
      />
      <div className="hero-shade" />
      <div className="hero-content container">
        <div className="hero-copy">
          <span className="hero-kicker"><span /> SOLAR + STORAGE, DESIGNED FOR NIGERIA</span>
          <h1>Power that works around <span>your life.</span></h1>
          <p>Solar, battery and hybrid power systems—designed, installed and supported for Nigerian homes and businesses.</p>
          <div className="hero-actions">
            <ButtonLink href="#contact">Plan your system</ButtonLink>
            <ButtonLink href="#projects" variant="outline">See what we do</ButtonLink>
          </div>
        </div>
        <div className="hero-note">
          <span className="hero-note-icon"><Icon name="sun" size={22} /></span>
          <span><strong>Designed. Installed. Supported.</strong><small>One team, from first survey to aftercare.</small></span>
        </div>
        <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
      </div>
    </section>
  )
}

function Statistics() {
  return (
    <section aria-label="Sunvolt at a glance" className="stats-strip">
      <div className="stats-grid container">
        {stats.map((stat, index) => (
          <div className="stat-item reveal" key={stat.label} style={{ '--reveal-order': index }}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="about-visual reveal">
          <img
            alt="Solar panels installed on the roof of a home surrounded by greenery"
            className="about-image"
            loading="lazy"
            sizes="(max-width: 720px) 90vw, (max-width: 1000px) 45vw, 540px"
            src={getUnsplashImage('photo-1497440001374-f26997328c1b', 1100, 82)}
            srcSet={getUnsplashSrcSet('photo-1497440001374-f26997328c1b', [360, 640, 1100], 82)}
          />
          <div className="about-stamp"><Icon name="leaf" size={19} /><span>Powering progress,<br />naturally.</span></div>
          <div className="about-image-index">01 <span aria-hidden="true">/</span> A BETTER WAY FORWARD</div>
        </div>
        <div className="about-copy reveal">
          <SectionHeading
            description="We design solar and battery systems around how a building actually uses power—not a one-size-fits-all package."
            eyebrow="Energy, thought through"
            title={<>A better system starts with <span>the right questions.</span></>}
          />
          <p className="about-detail">Our process brings site assessment, system design, installation and ongoing care together, so every decision has a reason behind it.</p>
          <div className="mission-row">
            <div><span className="mission-mark"><Icon name="sun" size={18} /></span><span><strong>How we work</strong><small>Specify for your load, not a sales target.</small></span></div>
            <div><span className="mission-mark"><Icon name="leaf" size={18} /></span><span><strong>What we value</strong><small>Clear advice, careful work, lasting support.</small></span></div>
          </div>
          <ButtonLink href="#contact" variant="dark">Talk through your needs</ButtonLink>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <SectionHeading
          description="A coordinated team for the whole system: from understanding your energy use to keeping your installation in good shape."
          eyebrow="What we do"
          title={<>From first survey to <span>long-term support.</span></>}
        />
        <div className="service-grid">
          {services.map((service, index) => (
            <article className="service-card reveal" key={service.title} style={{ '--reveal-order': index }}>
              <div className="service-icon"><Icon name={service.icon} size={24} /></div>
              <span className="card-index">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a aria-label={`Learn more about ${service.title}`} className="card-arrow" href="#contact"><Icon name="arrow" size={17} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section className="section products-section" id="products">
      <div className="container">
        <div className="products-heading">
          <SectionHeading
            description="We specify dependable solar, inverter and storage components to suit the system—not the other way around."
            eyebrow="Equipment that earns its place"
            title={<>The right parts.<br /><span>Working together.</span></>}
          />
          <ButtonLink href="#contact" variant="outline-dark">Talk to a specialist</ButtonLink>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card reveal" key={product.name} style={{ '--reveal-order': index }}>
              <div className="product-image-wrap">
                <img
                  alt={product.alt}
                  loading="lazy"
                  sizes="(max-width: 1000px) 45vw, 280px"
                  src={getUnsplashImage(product.image, 760)}
                  srcSet={getUnsplashSrcSet(product.image, [360, 640, 900])}
                />
                <span className="product-tag">{product.tag}</span>
              </div>
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.detail}</p>
                <a className="text-link" href="#contact">Explore product <Icon name="arrow" size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="section benefits-section">
      <div className="container benefits-layout">
        <div className="benefits-intro reveal">
          <SectionHeading
            description="The right solar partner makes all the difference. Here's what you can expect when you work with us."
            eyebrow="The Sunvolt difference"
            light
            title={<>Good people.<br /><span>Good energy.</span></>}
          />
          <a className="text-link" href="#contact">Let's talk about your project <Icon name="arrow" size={16} /></a>
        </div>
        <div className="benefits-grid">
          {benefits.map(([icon, title, description], index) => (
            <article className="benefit-item reveal" key={title} style={{ '--reveal-order': index }}>
              <span className="benefit-icon"><Icon name={icon} size={21} /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All projects')
  const visibleCount = projects.filter((project) => activeFilter === 'All projects' || project.category === activeFilter).length

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="projects-heading">
          <SectionHeading
            description="Different buildings. Different loads. Each system begins with the site's needs, then gets designed to match."
            eyebrow="Selected installations"
            title={<>Designed for the <span>real world.</span></>}
          />
        </div>
        <div aria-label="Filter projects" className="project-filters" role="group">
          {projectFilters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter}
              className={activeFilter === filter ? 'project-filter active' : 'project-filter'}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
          <span aria-live="polite" className="project-count">{String(visibleCount).padStart(2, '0')} PROJECTS</span>
        </div>
        <div className={`project-grid${activeFilter === 'All projects' ? '' : ' project-grid-filtered'}`}>
          {projects.map((project, index) => (
            <article
              className={`project-card reveal ${project.className}`}
              hidden={activeFilter !== 'All projects' && activeFilter !== project.category}
              key={project.title}
              style={{ '--reveal-order': index }}
            >
              <img
                alt={project.alt}
                loading="lazy"
                sizes="(max-width: 720px) 90vw, (max-width: 1000px) 50vw, 40vw"
                src={getUnsplashImage(project.image, 1050, 82)}
                srcSet={getUnsplashSrcSet(project.image, [400, 750, 1050], 82)}
              />
              <div className="project-overlay">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.system}</p>
                <a aria-label={`Discuss a project like ${project.title}`} className="project-arrow" href="#contact"><Icon name="arrow" size={17} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const testimonial = testimonials[active]

  return (
    <section className="section testimonials-section">
      <div className="container testimonial-layout">
        <div className="testimonial-intro reveal">
          <SectionHeading
            description="A little reassurance from people who have already made the switch."
            eyebrow="Illustrative customer stories"
            title={<>A brighter day,<br /><span>by word of mouth.</span></>}
          />
          <div className="testimonial-controls">
            <button aria-label="Previous testimonial" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)} type="button"><Icon name="chevron" size={19} className="rotate-chevron" /></button>
            <span>0{active + 1} <span aria-hidden="true">/</span> 0{testimonials.length}</span>
            <button aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)} type="button"><Icon name="chevron" size={19} /></button>
          </div>
        </div>
        <blockquote aria-live="polite" className="testimonial-card reveal">
          <div aria-label="5 out of 5 stars" className="testimonial-stars">★★★★★</div>
          <p>“{testimonial.quote}”</p>
          <footer>
            <span className="avatar">{testimonial.name.split(' ').map((part) => part[0]).join('')}</span>
            <span><strong>{testimonial.name}</strong><small>{testimonial.detail}</small></span>
            <span aria-hidden="true" className="quote-mark">”</span>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container cta-content reveal">
        <div><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Ready to switch to<br /><span>smarter energy?</span></h2></div>
        <ButtonLink href="#contact" variant="light">Let's get started</ButtonLink>
        <span aria-hidden="true" className="cta-sun"><Icon name="sun" size={172} /></span>
      </div>
    </section>
  )
}

function Contact() {
  const [formMessage, setFormMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const name = form.elements.namedItem('name')
    const message = form.elements.namedItem('message')
    name.setCustomValidity(name.value.trim().length < 2 ? 'Please enter a name with at least two characters.' : '')
    message.setCustomValidity(message.value.trim().length < 10 ? 'Please add at least 10 non-space characters.' : '')
    if (!form.reportValidity()) return
    setFormMessage('Thanks for reaching out. This portfolio demo does not send messages, but your form has been validated successfully.')
    form.reset()
  }

  function handleFormChange(event) {
    event.target.setCustomValidity('')
    setFormMessage('')
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-intro reveal">
          <SectionHeading
            description="Tell us a little about what you need. We’ll help you find a thoughtful way forward."
            eyebrow="Let's start a conversation"
            title={<>Your brighter future<br /><span>starts here.</span></>}
          />
          <div className="contact-details">
            <a href="mailto:hello@sunvolt.energy"><span className="contact-icon"><Icon name="mail" size={19} /></span><span><small>WRITE TO US</small><strong>hello@sunvolt.energy</strong></span></a>
            <a href="tel:+2342012345678"><span className="contact-icon"><Icon name="phone" size={19} /></span><span><small>GIVE US A CALL</small><strong>+234 201 234 5678</strong></span></a>
            <div><span className="contact-icon"><Icon name="pin" size={19} /></span><span><small>FIND US</small><strong>Lagos, Nigeria</strong></span></div>
          </div>
          <p className="contact-demo-note">Sample contact details for this portfolio concept.</p>
        </div>
        <form className="contact-form reveal" onInput={handleFormChange} onSubmit={handleSubmit}>
          <div className="form-heading"><span>01 <span aria-hidden="true">/</span> LET'S TALK</span><h3>Tell us about your project.</h3></div>
          <div className="form-row">
            <label>Your name<input autoComplete="name" maxLength={80} minLength={2} name="name" placeholder="e.g. Ada Okafor" required /></label>
            <label>Email address<input autoComplete="email" maxLength={254} name="email" placeholder="you@example.com" required type="email" /></label>
          </div>
          <div className="form-row">
            <label>Phone number<input autoComplete="tel" maxLength={24} name="phone" pattern={phonePattern} placeholder="+234 800 000 0000" required type="tel" /></label>
            <label>I'm interested in
              <select defaultValue="" name="service" required>
                <option disabled value="">Choose a service</option>
                <option>Residential solar</option>
                <option>Commercial solutions</option>
                <option>Inverter or battery storage</option>
                <option>Maintenance and support</option>
                <option>Energy consultation</option>
              </select>
            </label>
          </div>
          <label>Your message<textarea maxLength={1000} minLength={10} name="message" placeholder="A little about what you have in mind..." required rows="4" /></label>
          <div className="form-submit-row">
            <button className="button button-dark" type="submit">Send an enquiry <Icon name="arrow" size={17} /></button>
            <span>Just a demo. No message is sent.</span>
          </div>
          <p aria-live="polite" className="form-message" role="status">{formMessage}</p>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand light />
          <p>Thoughtful solar solutions for a brighter, more dependable energy future.</p>
          <div className="social-links">
            <a aria-label="Instagram" href="https://www.instagram.com/" rel="noreferrer" target="_blank"><Icon name="instagram" size={18} /></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/" rel="noreferrer" target="_blank"><span className="linkedin-mark">in</span></a>
            <a aria-label="Facebook" href="https://www.facebook.com/" rel="noreferrer" target="_blank"><span className="facebook-mark">f</span></a>
          </div>
        </div>
        <div className="footer-links"><h3>Explore</h3><a href="#about">About us</a><a href="#services">Our solutions</a><a href="#products">Products</a><a href="#projects">Our work</a></div>
        <div className="footer-links"><h3>Our services</h3><a href="#services">Residential solar</a><a href="#services">Commercial solar</a><a href="#services">Battery storage</a><a href="#services">Maintenance</a></div>
        <div className="footer-contact"><h3>Say hello</h3><a href="mailto:hello@sunvolt.energy">hello@sunvolt.energy</a><a href="tel:+2342012345678">+234 201 234 5678</a><span>Lagos, Nigeria</span><a className="footer-top" href="#home">Back to top ↑</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Sunvolt Energy.</span><span>Portfolio concept. Figures, projects, testimonials and contact details are illustrative.</span><a href="#home">Back to the sunshine <Icon name="sun" size={16} /></a></div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Statistics />
        <About />
        <Services />
        <Products />
        <WhyChooseUs />
        <Projects />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
