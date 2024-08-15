'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  EditOutlined,
  FileSearchOutlined,
  ApiOutlined,
  SmileOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: 'Comprehensive Inputs',
      description:
        'Easily input project details, time estimates, budget buffers, task breakdowns, roles, seniority, location, benefits, staff payroll, and profit margins.',
      icon: <EditOutlined />,
    },
    {
      heading: 'Accurate Outputs',
      description:
        'Generate a detailed budget overview and export it into a spreadsheet with a single click.',
      icon: <FileSearchOutlined />,
    },
    {
      heading: 'Seamless Integration',
      description:
        'Utilize Swagger API for easy integration with other web apps and OpenAI API for intelligent, predictive budgeting.',
      icon: <ApiOutlined />,
    },
    {
      heading: 'User-Friendly Interface',
      description: 'Enjoy a responsive design and intuitive user experience.',
      icon: <SmileOutlined />,
    },
  ]

  const testimonials = [
    {
      name: 'Jane Doe',
      designation: 'Non-Profit Director',
      content:
        'Using this app has cut our budget preparation time in half and significantly improved our grant approval rate.',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
  ]

  const navItems = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Features',
      link: '#features',
    },
    {
      title: 'Pricing',
      link: '#pricing',
    },
  ]

  const packages = [
    {
      title: 'Basic',
      description: 'For small teams and projects',
      monthly: 9,
      yearly: 69,
      features: ['Comprehensive Inputs', 'Accurate Outputs'],
    },
    {
      title: 'Pro',
      description: 'For growing teams and larger projects',
      monthly: 29,
      yearly: 249,
      features: [
        'Comprehensive Inputs',
        'Accurate Outputs',
        'Seamless Integration',
        'User-Friendly Interface',
      ],
      highlight: true,
    },
    {
      title: 'Enterprise',
      description: 'For large organizations',
      monthly: 99,
      yearly: 999,
      features: [
        'All Pro Features',
        'Dedicated Support',
        'Custom Integrations',
      ],
    },
  ]

  const questionAnswers = [
    {
      question: 'How does the free trial work?',
      answer:
        'You can use all features of the app for 14 days without any charge.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer:
        'Yes, you can cancel your subscription anytime from your account settings.',
    },
    {
      question: 'Is there a discount for annual subscription?',
      answer:
        'Yes, you get a significant discount if you choose the annual subscription.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards and PayPal.',
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: 'Input Project Details',
      description:
        'Provide detailed information about your project including time estimates, budget buffers, and task breakdowns.',
    },
    {
      heading: 'Generate Budget',
      description:
        'Let our AI-driven app create a comprehensive budget overview for you.',
    },
    {
      heading: 'Export & Integrate',
      description:
        'Export your budget into a spreadsheet and integrate with other web apps using our APIs.',
    },
    {
      heading: 'Submit Grant Application',
      description:
        'Use the accurate budget to complete your grant application and increase your chances of approval.',
    },
  ]

  const painPoints = [
    {
      emoji: '⏳',
      title: 'Time-Consuming Process',
    },
    {
      emoji: '❌',
      title: 'High Error Rate',
    },
    {
      emoji: '🔗',
      title: 'Lack of Integration',
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title="Streamline Your Grant Budgeting Process with AI Precision"
        subtitle="Effortlessly Create Accurate Budget Estimates and Increase Your Chances of Securing Funding"
        buttonText="Sign Up Now for a Free Trial"
        buttonLink="/register"
        pictureUrl="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/hjqjo1-budgetoor-wA31"
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText="from happy users"
          />
        }
      />
      <LandingSocialProof logos={logos} title="Featured on" />
      <LandingPainPoints
        title="The Challenges of Grant Budgeting"
        painPoints={painPoints}
      />
      <LandingHowItWorks title="How It Works" steps={steps} />
      <LandingFeatures
        id="features"
        title="Achieve Accurate Budgeting with Ease"
        subtitle="Our AI-driven app simplifies the budgeting process for grant applications"
        features={features}
      />
      <LandingTestimonials
        title="Success Stories"
        subtitle="Hear from our satisfied users"
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title="Choose Your Plan"
        subtitle="Flexible pricing options to suit your needs"
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title="Frequently Asked Questions"
        subtitle="Got questions? We've got answers."
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title="Ready to Simplify Your Grant Budgeting?"
        subtitle="Sign Up Today and Start Your Free Trial!"
        buttonText="Get Started"
        buttonLink="/register"
      />
    </LandingContainer>
  )
}
