"use client";

import React, { useState } from "react";
import Cropper from "react-easy-crop";

function EasyCrop() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  return (
    <Cropper
      image="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706__340.jpg"
      crop={crop}
      onCropChange={setCrop}
      cropShape="round"
    />
  );
}

export default function Testing() {
  return (
    <div>
      <div>Loading</div>
      <div>
        <EasyCrop />
      </div>
    </div>
  );
}
