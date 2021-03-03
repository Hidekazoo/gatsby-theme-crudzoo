import React from "react"
import cn from "classnames"

import { HeroImg } from "../components/icons/HeroImg"
import { Bio } from "../components/Bio"
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
        <span className={cn(styles.checkText)}>
          記事のご意見、ご感想、指摘歓迎です。
        </span>
        気になったことはなんでもどうぞ。書いている人について知りたい場合は次のボタンをクリック！
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
        </div>
        <div className={cn(styles.imgContent)}>
          <HeroImg className={styles.heroImg} />
        </div>
      </div>
    </div>
  )
}
