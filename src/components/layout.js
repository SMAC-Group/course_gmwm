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
                            <H3>About the instructors</H3>
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
                                        Davide Cucci is a Senior research associate.
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
