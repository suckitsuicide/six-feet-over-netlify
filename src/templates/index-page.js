import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

import styled from 'styled-components'

const HeroContainer = styled.div`
	min-height: 672px;
	display: flex;
	justify-content: flex-start;
	background-color: ${props => props.theme.basicBlue};
	background-image: url('/img/hero-homepage.jpg');
	background-size: cover;
	background-repeat: no-repeat;
`

const Hero = styled.div`
	margin: 125px auto 0 auto;
	display: flex;
	position: relative;
`

const HeroBox = styled.div`
	width: 544px;
	background-color: #ffffff;
	height: 416px;
	margin-right: 137px;
`

const HeroTagLine = styled.div`
	font-family: ${props => props.theme.fontAccent};
	font-size: 72px;
	width: 401px;
	color: #fff;
`

const HeroHeading = styled.h1`
	font-family: ${props => props.theme.fontHeading};
	margin: 90px 53px 13px 64px;
	line-height: 69px;
  font-size: 56px;
	color: #3c4557;
`
const HeroSubHeading = styled.p`
	margin: 0 53px 0 64px;
`

const HeroTitle = styled.div`
	padding: 10px 20px;
	background-color: #354463;
	font-family: ${props => props.theme.fontBase};
	font-size: 14px;
	color: #fff;
	position: absolute;
	top: -20px;
	left: 64px;
	text-transform: uppercase;
	font-weight: 300;
	letter-spacing: 2px;
`

const Action = styled.div`
	position: relative;
	ul {
		display: flex;
		justify-content: space-around;
		margin: 30px 0 0 0;
		li {
			list-style: none;
			width: 225px;
		}
	}

`

const Heading = styled.div`
	padding: 10px 20px;
	position: absolute;
	background-color: #3c4557;
	font-family: ${props => props.theme.fontBase};
	font-size: 14px;
	color: #fff;
	left: 45%;
	top: -51px;
	text-transform: uppercase;
	font-weight: 300;
	letter-spacing: 2px;

	&.rel {
		position: relative;
		top: inherit;
		left: inherit;
		display: inline-block;

		&.light {
			background-color: white;
			color: #3c4557;
		}
	}
`

const SectionDark = styled.div`
	background-color: #3c4557;
	padding: 86px 0;
`

const Content = styled.div`
	width: 1024px;
	margin: 0 auto;
`

const Headline = styled.h3`
	font-family: ${props => props.theme.fontHeading};
	color: white;
	font-size: 44px;
	line-height: 56px;
`

export const IndexPageTemplate = ({
  image,
	title,
	featured,
  heading,
  subheading,
	mainpitch,
	action,
  description,
  intro,
}) => (
  <div>
    <HeroContainer
      className="full-width-image margin-top-0"
    >
			<Hero>
				<HeroTitle>The Issue</HeroTitle>
				<HeroBox>
					<HeroHeading>
						{mainpitch.title}
					</HeroHeading>
					<HeroSubHeading>
						{mainpitch.description}
						<Link to={mainpitch.url}>{mainpitch.cta}</Link>
					</HeroSubHeading>
				</HeroBox>
				<HeroTagLine>
					#Help PREVENT SUICIDE
				</HeroTagLine>
			</Hero>
    </HeroContainer>

		<SectionDark>
			<Content>
				<Heading className={`rel light`}>
					{action.title}
				</Heading>
				<Headline>
					{action.description}
				</Headline>
				<p>{action.paragraph}</p>
			</Content>
		</SectionDark>

		<Action>
			<Heading>Take Action</Heading>
			<ul>
				{intro.blurbs.map((item, key) => {
					return(
						<li>
							<div>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</div>
						</li>
					)
				})
				}
			</ul>
		</Action>
		<SectionDark>
			<Content>
				<Heading className={`rel light`}>
					What We Do
				</Heading>
				<Headline>
					Our mission is to support Michigan families in their time of greatest need, after losing a loved one to suicide.
				</Headline>
			</Content>
		</SectionDark>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
	mainpitch: PropTypes.object,
	action: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
				title={frontmatter.title}
				featured={frontmatter.featured}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
				mainpitch={frontmatter.mainpitch}
				action={frontmatter.action}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
					cta
					url
        }
				action {
					title
					description
					paragraph
				}
        description
        intro {
          blurbs {
            title
						description
          }
          heading
          description
        }
      }
    }
  }
`
