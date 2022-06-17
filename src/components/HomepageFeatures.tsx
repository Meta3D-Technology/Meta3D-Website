import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '一切皆扩展',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
       通过组装多个扩展，积木式搭建自己的“Web3D应用和引擎”
      </>
    ),
  },
  {
    title: '开放的生态',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
通过分享扩展和协作开发，共建和谐共赢生态
      </>
    ),
  },
  {
    title: '只做一次',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        一个需求只实现一次，轻而易举地复用
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
