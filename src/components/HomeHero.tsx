import React from "react"
import { Link } from "gatsby"
import cn from "classnames"

import { HeroImg } from "../components/icons/HeroImg"
import { Button } from "../components/Button"
import styles from "../styles/components/HomeHero.module.css"

const HeroText: React.FC<{ text: string }> = ({ text }) => {
  return <div className={cn(styles.heroText)}>{text}</div>
}

const HeroDescription: React.FC = props => {
  const { children } = props
  return <div className={cn(styles.heroDescription)}>{children}</div>
}

interface HomeHeroProps {
  heroText?: string
  description?: React.ReactElement
}

const DescriptionComponent: React.FC = () => {
  return (
    <React.Fragment>
      <HeroDescription>
        Crudzooは学びをアウトプットしたい、色々な人に自分の書く文章を読んでもらいたい。そう思って作ったブログです。プログラムや趣味、好きなものについて書いています。
        <br />
        <span className={cn(styles.checkText)}>
          記事のご意見、ご感想、指摘歓迎です。
        </span>
        気になったことはなんでもどうぞ。
      </HeroDescription>
      <div className={cn(styles.bio)}>{/* <Bio /> */}</div>
    </React.Fragment>
  )
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  heroText = `Hello World`,
  description = <DescriptionComponent />,
}) => {
  return (
    <div className={cn(styles.homeHero)}>
      <div className={cn(styles.container)}>
        <div className={cn(styles.content)}>
          <HeroText text={heroText} />
          {description}

          <Link to={`/blog/about`}>
            <Button>運営者の情報をみる</Button>
          </Link>
        </div>
        <div className={cn(styles.imgContent)}>
          <HeroImg className={styles.heroImg} />
        </div>
      </div>
    </div>
  )
}
