const infoContent = (place: LocationDataType) =>
  `    <div class="info" style="display:flex; flex-direction:column; width:100%; min-width: 300px; height:auto; padding:12px; margin: 0px; border-color:white; ">` +
  `        <div style="display:flex; gap:12px; padding:4px; margin-bottom:4px; border-bottom:1px lightgray solid; justify-content:space-between;">` +
  `           <p style="font-weight:700" class="fontLg" >` +
  `            ${place.place_name}` +
  `           </p>` +
  `        </div>` +
  `        <div class="body">` +
  `            <div style="display:flex; flex-direction:column; gap:4px; ">` +
  `                <p class="fontSm">${place.address_name}</p>` +
  `                <p class="fontSm">내 위치에서 
                <span style="font-weight:700" > ${place.distance} m </span>
               </p>` +
  `            </div>` +
  `            <p class="fontSm">${place.phone}</p>` +
  `        </div>` +
  `    </div>`;
export default infoContent;
