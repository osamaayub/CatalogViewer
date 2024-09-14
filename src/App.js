/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect, useCallback} from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

const App=()=> {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [catalogs] = useState([...catalogsList])
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideTimer, setSlideTimer] = useState(null)
  const [slideDuration] = useState(3000)
  const [ischecked, setIschecked] = useState(false);
  const handleNext = useCallback(() => {
    setActiveIndex(prevIndex => (prevIndex + 1) % catalogs.length)
  }, [catalogs.length])

  // Correct useCallback for handlePrev
  const handlePrev = useCallback(() => {
    setActiveIndex(prevIndex => (prevIndex - 1 + catalogs.length) % catalogs.length)
  }, [catalogs.length]);


  useEffect(() => {
    let TimeInterval;
    if (ischecked) {
      TimeInterval=setInterval(handleNext, slideDuration);
      setSlideTimer(TimeInterval);
    }
    return () => {
      if (TimeInterval) {
        clearInterval(TimeInterval);
        setSlideTimer(TimeInterval);
      }
    }
  }, [ischecked,handleNext,slideDuration])
  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={handlePrev}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={handleNext}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            type='checkbox'
            data-testid='toggle-slide-show-button'
            value={ischecked}
            onChange={ () => setIschecked(checked=>!checked)}
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

