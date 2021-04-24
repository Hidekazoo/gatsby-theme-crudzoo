import cn from "classnames"
import React from "react"

import styles from "../styles/components/HomeHero.module.css"
import { HeroImg } from "./HeroImg"
import { HomeHeroDescription } from "./HomeHeroDescription"

const HeroText: React.FC<{ text: string }> = ({ text }) => {
  return <div className={cn(styles.heroText)}>{text}</div>
}

interface HomeHeroProps {
  heroText?: string
  description: string
}

const HeroDescription: React.FC = props => {
  const { children } = props
  return <div className={cn(styles.heroDescription)}>{children}</div>
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  heroText = `Hello World`,
  description,
}) => {
  return (
    <div className={cn(styles.homeHero)}>
      <div className={cn(styles.container)}>
        <div className={cn(styles.content)}>
          <HeroText text={heroText} />
          <HeroDescription>
            <HomeHeroDescription description={description} />
          </HeroDescription>
        </div>
        <div className={cn(styles.imgContent)}>
          <HeroImg className={styles.heroImg} />
        </div>
      </div>
    </div>
  )
}
