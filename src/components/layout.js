import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import SEO from './seo'
import { Link } from './link'
import { H3 } from './typography'
import Logo from '../../static/logo.svg'

import '../styles/index.sass'
import classes from '../styles/layout.module.sass'


const Layout = ({ isHome, title, description, children }) => {
    return (
        <StaticQuery
            query={graphql`
                {
                    site {
                        siteMetadata {
                            title
                            description
                            bio
                            showProfileImage
                            footerLinks {
                                text
                                url
                            }
                        }
                    }
                }
            `}
            render={data => {
                const meta = data.site.siteMetadata
                return (
                    <>
                        <SEO title={title} description={description} />
                        <main className={classes.root}>
                            {!isHome && (
                                <h1 className={classes.logo}>
                                    <Link hidden to="/">
                                        <Logo width={150} height={54} aria-label={meta.title} />
                                    </Link>
                                </h1>
                            )}
                            <div className={classes.content}>
                                {(title || description) && (
                                    <header className={classes.header}>
                                        {title && <h1 className={classes.title}>{title}</h1>}
                                        <br/>
                                        {description && (
                                            <p className={classes.description}>{description}</p>
                                        )}
                                    </header>
                                )}
                                {children}
                            </div>

                            <footer className={classes.footer}>
                            
                            <div align="center">
                <h1 className={classes.subtitle}>Inference for large-scale time series with application to sensor fusion</h1>
                </div>
                <div align="center">
                <h4 className={classes.subtitle}> The content accessible on this site was produced as part of the PhD course</h4>
                <h4 className={classes.subtitle}> "Inference for large-scale time series with application to sensor fusion" given at EPFL in January 2020.</h4>
                
                <h4 className={classes.subtitle}> All documents, exercises and the website have been prepared by Prof. Stéphane Guerrier, Prof. Jan Skaloud, Davide Cucci and Lionel Voirol. </h4>
                </div>
                

                            
                            <div align="center">
                            <H3> <b>About the instructors </b></H3>
                            </div>
                                <div className={classes.footerContent}>
                                    <section className={classes.footerSection}>
                                        {meta.showProfileImage && (
                                            <img
                                                src="/jan_skaloud.png"
                                                alt=""
                                                className={classes.profile}
                                            />
                                        )}

                                        
                                        <p> 
                                        Jan Skaloud is a senior scientist and lecturer at the Swiss Federal Institute of Technology Lausanne (EPFL) and Adjunct Professor at the Department of Geomatics Engineering at The University of Calgary. His research is related to methodologies and applications in sensor fusion for autonomous navigation, precise positioning, attitude determination and mobile mapping. He is a member and active participant in numerous international professional and scientific organisations in this field. 
                                        </p>
                                            
                                    </section>
                                    
                                    
                                    
                                    
                                    
                                    <section className={classes.footerSection}>
                                    
                                        {meta.showProfileImage && (
                                            <img
                                                src="/profile.jpg"
                                                alt=""
                                                className={classes.profile}
                                            />
                                        )}
                                        <p>{meta.bio}</p>
                                    
                                    </section>
                                    
                                    <section className={classes.footerSection}>
                                        {meta.showProfileImage && (
                                            <img
                                                src="/davide.jpg"
                                                alt=""
                                                className={classes.profile}
                                            />
                                        )}

                                        
                                        <p> 
                                        Davide A. Cucci test received his bachelor and master degrees in computer engineering from Politecnico di Milano, Italy, in 2008 and 2011. From the same university, he obtained the Ph.D. degree in 2014. Between 2015 and 2019 he has been post-doc researcher at the Geodetic Engineering Laboratory, École polytechnique fédérale de Lausanne (EPFL), Switzerland. He is currently senior research associate at the University of Geneva, Switzerland. Since 2019 he is also researcher at MindEarth, a swiss non-profit startup working in the fields of remote sensing and Earth observation. His research interests lie in methods for high-accuracy navigation and mapping, but also span computer vision, machine learning and robotics.
                                        </p>
                                            
                                    </section>
                                    
                                     <div align="center">
                                    <section>
                                   
                                    <img
                                                src="/licence.png"
                                                alt=""
                                                
                                            />
                                    

                                    </section>
                                    </div>

                                    {meta.footerLinks && (
                                        <ul className={classes.footerLinks}>
                                            {meta.footerLinks.map(({ text, url }, i) => (
                                                <li key={i} className={classes.footerLink}>
                                                    <Link variant="secondary" to={url}>
                                                        {text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </footer>
                        </main>
                    </>
                )
            }}
        />
    )
}

export default Layout
